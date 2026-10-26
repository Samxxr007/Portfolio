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

    const root = document.querySelector(".portfolio-story");
    if (!root) return undefined;

    const selector = [
      ".chapter-kicker",
      ".chapter-heading",
      ".chapter-intro",
      ".chapter-rail",
      ".chapter-row",
      ".skills-marquee",
      ".project-archive",
      ".credential-stage",
      ".credential-index-item",
      ".contact-finale__thought",
      ".contact-finale__email",
      ".contact-finale__orbit",
      ".contact-finale__bottom",
      ".contact-finale__footer",
      ".orbital-feature__copy",
      ".orbital-feature__diagram",
    ].join(", ");

    const targets = Array.from(root.querySelectorAll(selector));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("story-reveal-ready");
      targets.forEach((target) => target.classList.remove("story-reveal", "is-visible"));
      return undefined;
    }

    // Reset stale classes from Vite HMR, browser back/forward and hash navigation.
    targets.forEach((target) => {
      target.classList.add("story-reveal");
      target.classList.remove("is-visible");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: "0px 0px -7% 0px",
      threshold: 0.04,
    });

    targets.forEach((target) => observer.observe(target));
    root.classList.add("story-reveal-ready");

    // Hash navigation may land directly in the middle of a chapter; explicitly
    // reveal anything already on screen so it can never remain invisible.
    const revealCurrentViewport = () => {
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          target.classList.add("is-visible");
          observer.unobserve(target);
        }
      });
    };
    const frame = window.requestAnimationFrame(revealCurrentViewport);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      root.classList.remove("story-reveal-ready");
      targets.forEach((target) => target.classList.remove("story-reveal", "is-visible"));
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
