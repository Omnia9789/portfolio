/* =========================================================
   YEAR
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   MOBILE NAV
========================================================= */
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
menuToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

/* =========================================================
   REVEAL ANIMATIONS (GSAP if present, else IntersectionObserver fallback)
========================================================= */
function initReveals(){
  const heroEls = document.querySelectorAll('.reveal-hero');
  const upEls = document.querySelectorAll('.reveal-up');

  if (window.gsap){
    gsap.registerPlugin(ScrollTrigger);

    // Orchestrated hero entrance
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.badge-avail', { opacity:1, y:0, duration:.6 }, 0.05)
      .to('.hero .eyebrow', { opacity:1, y:0, duration:.6 }, 0.15)
      .to('.hero-name', { opacity:1, y:0, duration:.7 }, 0.22)
      .to('.role-row', { opacity:1, y:0, duration:.6 }, 0.4)
      .to('.hero-desc', { opacity:1, y:0, duration:.6 }, 0.5)
      .to('.hero-cta', { opacity:1, y:0, duration:.6 }, 0.6)
      .to('.hero-stack', { opacity:1, y:0, duration:.6 }, 0.68)
      .to('#robotWrap', { opacity:1, y:0, duration:.9 }, 0.3);

    upEls.forEach((el) => {
      gsap.to(el, {
        opacity:1, y:0, duration:.8, ease:'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  } else {
    // fallback
    heroEls.forEach(el => el.classList.add('revealed'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
    }, { threshold: .15 });
    upEls.forEach(el => io.observe(el));
  }
}
initReveals();

/* =========================================================
   TABS (Experience + Projects)
========================================================= */
function initTabs(groupName, listSelector, cardSelector){
  const group = document.querySelector(`.tabs[data-group="${groupName}"]`);
  if (!group) return;
  const buttons = group.querySelectorAll('.tab');
  const cards = document.querySelectorAll(`${listSelector} ${cardSelector}`);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = card.dataset.cat === filter;
        if (match){
          card.hidden = false;
          if (window.gsap){
            gsap.fromTo(card, { opacity:0, y:16 }, { opacity:1, y:0, duration:.5, ease:'power2.out' });
          }
        } else {
          card.hidden = true;
        }
      });
    });
  });
}
initTabs('exp', '#expList', '.tl-card');
initTabs('proj', '#projList', '.proj-card');

/* =========================================================
   HERO ROLE TYPING EFFECT
========================================================= */
const roleWords = [
  'AI / LLM Systems',
  '.NET Backend & Cloud',
  'Data Engineering',
  'AI Automation & RPA'
];
const roleTypeEl = document.getElementById('roleType');
let rIdx = 0, cIdx = 0, deleting = false;

function typeLoop(){
  const word = roleWords[rIdx];
  if (!deleting){
    cIdx++;
    roleTypeEl.textContent = word.slice(0, cIdx);
    if (cIdx === word.length){
      deleting = true;
      setTimeout(typeLoop, 1700);
      return;
    }
    setTimeout(typeLoop, 45);
  } else {
    cIdx--;
    roleTypeEl.textContent = word.slice(0, cIdx);
    if (cIdx === 0){
      deleting = false;
      rIdx = (rIdx + 1) % roleWords.length;
      setTimeout(typeLoop, 300);
      return;
    }
    setTimeout(typeLoop, 22);
  }
}
typeLoop();

/* =========================================================
   CERTIFICATE LIGHTBOX
========================================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxIssuer = document.getElementById('lightboxIssuer');
const lightboxDownload = document.getElementById('lightboxDownload');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(card){
  const full = card.dataset.full;
  const title = card.dataset.title;
  const issuer = card.dataset.issuer;
  const date = card.dataset.date;
  lightboxImg.src = full;
  lightboxImg.alt = title;
  lightboxTitle.textContent = title;
  lightboxIssuer.textContent = date ? `${issuer} · ${date}` : issuer;
  const dlBtn = card.querySelector('.cert-download');
  lightboxDownload.onclick = () => triggerDownload(dlBtn.dataset.file, dlBtn.dataset.name);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.cert-download')) return;
    openLightbox(card);
  });
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function triggerDownload(url, filename){
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement('a');
      const objUrl = URL.createObjectURL(blob);
      a.href = objUrl;
      a.download = filename || 'certificate.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objUrl);
    })
    .catch(() => { window.open(url, '_blank'); });
}
document.querySelectorAll('.cert-download').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerDownload(btn.dataset.file, btn.dataset.name);
  });
});

/* =========================================================
   CONTACT FORM (static site — no backend, so this opens
   a pre-filled email in the visitor's mail client instead)
========================================================= */
const contactForm = document.getElementById('contactForm');
if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    const body = `${message}\n\n—\n${name}\n${email}`;
    const mailto = `mailto:omniaali80087@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio inquiry')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
