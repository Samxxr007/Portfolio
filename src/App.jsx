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
// import ThemeCustomizer from "./components/ThemeCustomizer";
import Preloader from "./components/Preloader";
import DynamicBackground from "./components/DynamicBackground";
import { ThemeProvider } from "./context/ThemeContext";
import ClickSpark from "./components/ClickSpark";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Prevention of scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor="#FF4F2B"
        sparkSize={10}
        sparkRadius={16}
        sparkCount={7}
        duration={380}
        easing="ease-out"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Preloader key="preloader" onComplete={handleLoadingComplete} />
          ) : (
            <Motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="min-h-screen text-[#151515] bg-[#F5F1E8] font-sans selection:bg-[#FF4F2B]/20 selection:text-[#151515] pb-20"
            >
              <DynamicBackground />
              {/* ThemeCustomizer commented out per instruction */}
              {/* <ThemeCustomizer /> */}
              <Navbar />
              <main className="flex flex-col items-center w-full">
                <Hero />
                <About />
                <TechStack />
                <Experience />
                <Projects />
                <Certificates />
                <Contact />
              </main>
            </Motion.div>
          )}
        </AnimatePresence>
      </ClickSpark>
    </ThemeProvider>
  );
}
