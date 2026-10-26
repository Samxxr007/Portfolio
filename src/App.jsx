import { useState, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import DynamicBackground from "./components/DynamicBackground";
import { ThemeProvider } from "./context/ThemeContext";
import ClickSpark from "./components/ClickSpark";
import { useReducedMotion } from "./hooks/useReducedMotion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || reducedMotion) return undefined;

    let refreshFrame;
    const root = document.querySelector(".portfolio-story");
    if (!root) return undefined;

    const context = gsap.context(() => {
      // Keep hero transforms owned by Hero.jsx. A second intro timeline here
      // used to animate the same artwork while ScrollTrigger was scrubbing it,
      // causing the sculpture to feel like it was fighting the scroll.


      // Each chapter now has its own staggered, reversible scroll sequence.
      // Unlike the previous first-child fade, this animates the headings,
      // chapter rows, and chapter-specific visual elements independently.
      const chapterTargets = [
        ".chapter-kicker",
        ".chapter-heading",
        ".chapter-intro",
        ".chapter-rail",
        ".chapter-row",
        ".about-statement",
        ".skills-marquee",
        ".experience-endnote",
        ".project-archive",
        ".projects-endline",
        ".certificates-heading",
        ".contact-heading",
      ].join(", ");

      gsap.utils.toArray("main > section.story-chapter").forEach((section) => {
        const targets = section.querySelectorAll(chapterTargets);
        if (!targets.length) return;

        gsap.fromTo(targets,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            ease: "power3.out",
            stagger: { each: 0.075, from: "start" },
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 24%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const feature = root.querySelector(".orbital-feature");
      if (feature) {
        gsap.fromTo(
          feature.querySelectorAll(".orbital-feature__copy, .orbital-feature__diagram"),
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: feature,
              start: "top 85%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // A chapter may change height at mobile breakpoints or when its archive expands.
      // ScrollTrigger's refresh plus responsive refresh keeps starts/ends in sync.
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshOnLoad);

    return () => {
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refreshOnLoad);
      context.revert();
    };
  }, [isLoading, reducedMotion]);

  return (
    <ThemeProvider>
      <ClickSpark sparkColor="#FF4F2B" sparkSize={10} sparkRadius={16} sparkCount={7} duration={380} easing="ease-out">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Preloader key="preloader" onComplete={handleLoadingComplete} />
          ) : (
            <Motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              className="min-h-screen text-[#151515] bg-[#F5F1E8] font-sans selection:bg-[#FF4F2B]/20 selection:text-[#151515]"
            >
              <DynamicBackground />
              <Navbar />
              <main className="portfolio-story flex flex-col items-center w-full">
                <Hero />
                <div className="story-divider" aria-hidden="true">
                  <span>THE PRACTICE</span><span className="story-divider__line" /><span>SCROLL TO DISCOVER ↓</span>
                </div>
                <About />
                <TechStack />
                <Experience />
                <Projects />
                <Certificates />
                <Contact />
              </main>
              <footer className="story-footer">
                <a href="#home" className="story-footer__brand">SAMEER AHMED G<span>.</span></a>
                <span>DESIGNED WITH INTENTION · CHENNAI, INDIA</span>
                <a href="#home" className="story-footer__top">BACK TO TOP ↑</a>
              </footer>
            </Motion.div>
          )}
        </AnimatePresence>
      </ClickSpark>
    </ThemeProvider>
  );
}
