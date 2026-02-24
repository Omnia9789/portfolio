import { useState } from "react";

import Background from "./components/Background";
import Navbar from "./components/Navbar";
import FloatingAssistantButton from "./components/FloatingAssistantButton";
import AIAssistantPanel from "./components/AIAssistantPanel";

import Home from "./sections/Home";
import About from "./sections/About";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";

import { profileAI } from "./data/profile.ai";

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen text-white">
      <Background />
      <Navbar profile={profileAI} />

      <main>
        <Home profile={profileAI} />
        <About profile={profileAI} />
        <Education profile={profileAI} />
        <Experience profile={profileAI} />
        <Projects projects={profileAI.projects} />
        <Certificates certificates={profileAI.certificates} />
        <Contact profile={profileAI} />
      </main>

      {/* Floating assistant button */}
      <FloatingAssistantButton onClick={() => setAssistantOpen(true)} />

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-sm text-white/50">
        © {new Date().getFullYear()} {profileAI.shortName}. Built with React.
      </footer>
    </div>
  );
}