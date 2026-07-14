import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

(function initRobot(){
  const wrap = document.getElementById('robotWrap');
  const canvas = document.getElementById('robotCanvas');
  if (!wrap || !canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e){
    canvas.style.display = 'none';
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();

  const CAMERA_LOOKAT_Y = 0.15;
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.28, 6.6);
  camera.lookAt(0, CAMERA_LOOKAT_Y, 0);

  // ---- Environment for realistic PBR reflections ----
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;

  // ---- Lights ----
  scene.add(new THREE.AmbientLight(0x1a1a2a, 0.6));

  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(2.2, 3.5, 3.5);
  scene.add(key);

  const rimViolet = new THREE.PointLight(0x7c5cff, 22, 14, 2);
  rimViolet.position.set(-2.6, 1.2, -1.6);
  scene.add(rimViolet);

  const rimCyan = new THREE.PointLight(0x22d3ee, 18, 14, 2);
  rimCyan.position.set(2.4, -0.6, -1.8);
  scene.add(rimCyan);

  const fill = new THREE.DirectionalLight(0x8888aa, 0.6);
  fill.position.set(-2, -1, 2);
  scene.add(fill);

  const front = new THREE.PointLight(0xffffff, 3.5, 14, 2);
  front.position.set(0, 0.6, 4.5);
  scene.add(front);

  // ---- Glossy piano-black material (this asset ships with no materials/textures of its own) ----
  const pianoBlackMat = new THREE.MeshPhysicalMaterial({
    color: 0x1c1c22,
    metalness: 0.85,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    reflectivity: 1,
    envMapIntensity: 2.2,
  });

  // ---- Root wrapper the whole model lives in (drives lean/float/spin) ----
  const robot = new THREE.Group();
  scene.add(robot);

  const modelPivot = new THREE.Group();
  robot.add(modelPivot);

  let headNode = null, headBind = null;
  let eyeL = null, eyeR = null, eyeBaseL = null, eyeBaseR = null;
  const TARGET_HEIGHT = 4.6;

  // ---- Reusable radial-gradient glow texture (used by the aura sprite below and the visor accent) ----
  function makeGlowTexture(colorA, colorB){
    const size = 256;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    grad.addColorStop(0, colorA);
    grad.addColorStop(0.5, colorB);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  // ---- Face accent: this asset has no eyes/visor/face geometry of its own, so we add a
  // thin glowing "visor" strip as a separate object, parented to the head so it inherits
  // head tracking automatically. Position is derived from the head's real (post-scale,
  // post-centering) world bounding box rather than hardcoded numbers, so it stays correct
  // even if TARGET_HEIGHT or the model changes later. ----
  function addFaceVisor(head){
    const headBox = new THREE.Box3().setFromObject(head);
    const headSize = new THREE.Vector3();
    headBox.getSize(headSize);
    const headCenter = new THREE.Vector3();
    headBox.getCenter(headCenter);

    // Front-and-slightly-upper point on the head, in world space
    const worldPos = new THREE.Vector3(
      headCenter.x,
      headBox.min.y + headSize.y * 0.58,
      headBox.max.z + headSize.z * 0.03
    );
    const localPos = head.worldToLocal(worldPos.clone());

    const visorGroup = new THREE.Group();
    visorGroup.position.copy(localPos);

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x38e8ff,
      emissiveIntensity: 2.4,
      roughness: 0.3,
      metalness: 0,
      toneMapped: false,
    });
    const visorGeo = new THREE.BoxGeometry(
      Math.max(headSize.x * 0.5, 0.01),
      Math.max(headSize.y * 0.06, 0.005),
      Math.max(headSize.z * 0.1, 0.005)
    );
    visorGroup.add(new THREE.Mesh(visorGeo, visorMat));

    // Soft additive glow behind the visor strip
    const glowTex = makeGlowTexture('rgba(56,232,255,0.9)', 'rgba(56,232,255,0.25)');
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.set(headSize.x * 0.9, headSize.x * 0.9, 1);
    glow.position.z += 0.01;
    visorGroup.add(glow);

    // Bright "pupil" dots that slide within the visor toward the cursor. The head itself
    // already turns to face the cursor (see animate()), but on a wide flat visor that
    // rotation alone reads subtly — these give a more immediate, obvious eye-tracking cue.
    const pupilMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xf5ffff,
      emissiveIntensity: 3,
      toneMapped: false,
    });
    const pupilGeo = new THREE.SphereGeometry(Math.max(headSize.y * 0.032, 0.006), 12, 12);
    const pupilZ = headSize.z * 0.07;
    const pupilSpan = headSize.x * 0.16;

    eyeL = new THREE.Group();
    eyeL.position.set(-pupilSpan, 0, pupilZ);
    eyeL.add(new THREE.Mesh(pupilGeo, pupilMat));
    visorGroup.add(eyeL);
    eyeBaseL = eyeL.position.clone();

    eyeR = new THREE.Group();
    eyeR.position.set(pupilSpan, 0, pupilZ);
    eyeR.add(new THREE.Mesh(pupilGeo, pupilMat));
    visorGroup.add(eyeR);
    eyeBaseR = eyeR.position.clone();

    head.add(visorGroup);
    console.log('[robot] face visor + eyes added.');
    return visorGroup;
  }

  const loader = new GLTFLoader();
  console.log('[robot] loading assets/models/nexbot.gltf ...');
  loader.load(
    'assets/models/nexbot.gltf',
    (gltf) => {
      console.log('[robot] gltf loaded, scene children:', gltf.scene.children.length);
      // This file also contains a leftover, unused rig from an earlier asset
      // merged into the same scene — pull out only the actual Nexbot subtree.
      const bot = gltf.scene.getObjectByName('Bot') || gltf.scene;
      if (bot === gltf.scene){
        console.warn('[robot] "Bot" node not found by name — using entire loaded scene as fallback.');
      }

      bot.traverse((obj) => {
        if (obj.isMesh){
          obj.material = pianoBlackMat;
          obj.frustumCulled = false;
        }
      });

      // IMPORTANT: this file bakes a scene-root scale (0.01) onto an ancestor
      // of "Bot" that is unrelated to the leftover rig. Reparenting with
      // .add() drops that inherited scale silently (it only copies bot's
      // *local* transform, not its resolved world transform), which made the
      // model balloon to ~100x its intended size and swallow the camera.
      // .attach() reparents while preserving the object's current world
      // transform, so the effective scale carries over correctly.
      modelPivot.attach(bot);

      // Auto-fit: measure, center, scale to match the site's established framing.
      // Safe to do now — bot's parent chain (modelPivot -> robot -> scene) is
      // all identity/translation-only, so "world space" and "local space"
      // agree on scale/orientation and this math is no longer ambiguous.
      const box = new THREE.Box3().setFromObject(bot);
      const size = new THREE.Vector3();
      box.getSize(size);
      console.log('[robot] raw bounding box size:', size.x.toFixed(3), size.y.toFixed(3), size.z.toFixed(3));
      const scale = TARGET_HEIGHT / (size.y || 1);
      bot.scale.multiplyScalar(scale);

      const box2 = new THREE.Box3().setFromObject(bot);
      const center2 = new THREE.Vector3();
      box2.getCenter(center2);

      // Vertical framing: the model (TARGET_HEIGHT) is taller than what this camera's
      // frustum can show at once, so something has to be cropped. Anchor the TOP of the
      // head to a fixed spot with margin below the frustum's top edge (rather than
      // centering the whole body), so any overflow comes off the legs/feet at the
      // bottom instead of the head at the top.
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const camDistance = camera.position.z; // model sits close to z=0
      const visibleHeight = 2 * Math.tan(vFov / 2) * camDistance;
      const frustumTopY = CAMERA_LOOKAT_Y + visibleHeight / 2;
      const HEAD_MARGIN = 0.35; // world units of headroom — absorbs idle float + head tilt

      bot.position.x -= center2.x;
      bot.position.z -= center2.z;
      bot.position.y += (frustumTopY - HEAD_MARGIN) - box2.max.y;

      console.log('[robot] model added to scene, final scale:', bot.scale.x.toFixed(6));

      headNode = bot.getObjectByName('Head');
      if (headNode){
        headBind = headNode.quaternion.clone();
        console.log('[robot] head node found, tracking enabled.');
        addFaceVisor(headNode);
      } else {
        console.warn('[robot] "Head" node not found — head tracking disabled.');
      }
    },
    (progress) => {
      if (progress.total){
        console.log('[robot] loading progress:', Math.round((progress.loaded / progress.total) * 100) + '%');
      }
    },
    (err) => {
      console.error('[robot] nexbot.gltf failed to load:', err);
    }
  );

  robot.position.y = -0.35;

  // ---- Aura glow sprite (soft additive glow behind the figure) ----
  const glowTex = makeGlowTexture('rgba(124,92,255,0.55)', 'rgba(34,211,238,0.18)');
  const glowMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const glowSprite = new THREE.Sprite(glowMat);
  glowSprite.scale.set(3.2, 3.2, 1);
  glowSprite.position.set(0, 0.3, -1.2);
  scene.add(glowSprite);

  // ---- Resize ----
  function resize(){
    const w = wrap.clientWidth || 1;
    const h = wrap.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(wrap);

  // ---- Pointer interaction ----
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let lastMoveTime = performance.now();

  function updatePointer(clientX, clientY){
    pointer.targetX = (clientX / window.innerWidth) * 2 - 1;
    pointer.targetY = (clientY / window.innerHeight) * 2 - 1;
    lastMoveTime = performance.now();
  }
  window.addEventListener('pointermove', (e) => updatePointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  // Drag-to-spin on the canvas itself
  let dragging = false, dragStartX = 0, dragStartRotY = 0, extraRotY = 0, extraRotYTarget = 0;
  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true; dragStartX = e.clientX; dragStartRotY = extraRotYTarget;
    canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('pointerup', () => { dragging = false; canvas.style.cursor = 'grab'; });
  window.addEventListener('pointermove', (e) => {
    if (dragging){
      extraRotYTarget = dragStartRotY + (e.clientX - dragStartX) * 0.006;
    }
  });

  // ---- Animation loop ----
  const clock = new THREE.Clock();
  const _euler = new THREE.Euler();
  const _quat = new THREE.Quaternion();
  let curHeadY = 0, curHeadX = 0;

  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    pointer.x += (pointer.targetX - pointer.x) * 0.06;
    pointer.y += (pointer.targetY - pointer.y) * 0.06;
    extraRotY += (extraRotYTarget - extraRotY) * 0.1;

    const idle = performance.now() - lastMoveTime > 3500;

    const lookY = idle ? Math.sin(t * 0.35) * 0.4 : pointer.x * 0.42;
    const lookX = idle ? Math.sin(t * 0.5) * 0.08 : -pointer.y * 0.22;

    curHeadY += (lookY - curHeadY) * 0.08;
    curHeadX += (lookX - curHeadX) * 0.08;

    // Head turns to track the cursor
    if (headNode && headBind){
      _euler.set(curHeadX * 0.5, curHeadY * 0.5, 0);
      _quat.setFromEuler(_euler);
      headNode.quaternion.copy(headBind).multiply(_quat);
    }

    // Pupils slide within the visor on top of the head's own rotation, using the same
    // smoothed look signal — makes the "looking at cursor" effect read clearly even
    // though the head turn itself is subtle.
    if (eyeL && eyeR && eyeBaseL && eyeBaseR){
      const eyeShiftX = curHeadY * 0.05;
      const eyeShiftY = curHeadX * 0.035;
      eyeL.position.set(eyeBaseL.x + eyeShiftX, eyeBaseL.y + eyeShiftY, eyeBaseL.z);
      eyeR.position.set(eyeBaseR.x + eyeShiftX, eyeBaseR.y + eyeShiftY, eyeBaseR.z);
    }

    // Subtle whole-body follow (lean + drag-to-spin)
    robot.rotation.y = curHeadY * 0.16 + extraRotY;
    robot.rotation.x = curHeadX * 0.07;

    // Idle float + sway
    robot.position.y = -0.35 + Math.sin(t * 0.9) * 0.06;
    robot.rotation.z = Math.sin(t * 0.6) * 0.02;

    // Aura pulse
    const pulse = 1 + Math.sin(t * 1.1) * 0.06;
    glowSprite.scale.set(3.2 * pulse, 3.2 * pulse, 1);
    glowMat.opacity = 0.85 + Math.sin(t * 1.1) * 0.1;

    renderer.render(scene, camera);
  }
  animate();
})();
