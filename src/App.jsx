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

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray("main > section:not(#home):not(.orbital-feature)");
      sections.forEach((section) => {
        const children = section.querySelectorAll(":scope > div");
        if (!children.length) return;
        gsap.fromTo(children,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.11,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      const feature = document.querySelector(".orbital-feature");
      if (feature) {
        gsap.fromTo(feature.querySelectorAll(".orbital-feature__copy, .orbital-feature__diagram"),
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: { trigger: feature, start: "top 75%", once: true },
          }
        );
      }
    });

    return () => context.revert();
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
