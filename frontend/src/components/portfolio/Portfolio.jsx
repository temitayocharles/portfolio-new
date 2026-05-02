import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#0a0f14] text-slate-200 antialiased selection:bg-teal-300/30 selection:text-teal-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Portfolio;
