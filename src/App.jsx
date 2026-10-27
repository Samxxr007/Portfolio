import { useState, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
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


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return undefined;

    const sections = Array.from(document.querySelectorAll(
      ".portfolio-story > #home, .portfolio-story > .story-chapter"
    ));
    if (!sections.length) return undefined;

    // Every chapter gets a one-shot entrance when it actually reaches the viewport.
    // Nothing is hidden before the observer fires, so direct hash links stay readable.
    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("chapter-motion-live"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("chapter-motion-live");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 0px 0px" });

    sections.forEach((section) => {
      section.classList.remove("chapter-motion-live");
      section.classList.add("chapter-motion-ready");
      observer.observe(section);
    });

    const revealVisibleSections = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          section.classList.add("chapter-motion-live");
          observer.unobserve(section);
        }
      });
    };
    const frame = window.requestAnimationFrame(revealVisibleSections);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove("chapter-motion-ready", "chapter-motion-live");
      });
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
