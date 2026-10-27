import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import SceneFallback from "./scene/SceneFallback";

// Keep Three.js / WebGL off the critical path for the first paint.
const PortfolioCanvas = lazy(() => import("./scene/PortfolioCanvas"));
import ResumeModal from "./ResumeModal";
import { useReducedMotion } from "../hooks/useReducedMotion";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [shouldLoadScene, setShouldLoadScene] = useState(false);
    const reducedMotion = useReducedMotion();
    const scrollProgressRef = useRef(0);
    const heroRef = useRef(null);
    const lineOneRef = useRef(null);
    const lineTwoRef = useRef(null);
    const lineThreeRef = useRef(null);
    const artworkRef = useRef(null);

    // Defer Three.js evaluation until the browser is idle; the CSS fallback paints immediately.
    useEffect(() => {
        if (reducedMotion) return undefined;

        let idleId = null;
        let timeoutId = null;
        const enableScene = () => setShouldLoadScene(true);

        if (typeof window.requestIdleCallback === "function") {
            idleId = window.requestIdleCallback(enableScene, { timeout: 1200 });
        } else {
            timeoutId = window.setTimeout(enableScene, 220);
        }

        return () => {
            if (idleId !== null && typeof window.cancelIdleCallback === "function") {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId !== null) window.clearTimeout(timeoutId);
        };
    }, [reducedMotion]);

    // Pin the opening as a scroll-controlled scene. Only this component controls
    // the hero's transforms; App.jsx animates the chapters below it.
    useEffect(() => {
        if (reducedMotion || !heroRef.current) return undefined;

        const hero = heroRef.current;
        scrollProgressRef.current = 0;

        const context = gsap.context(() => {
            // Small entrance details are independent from the scroll-controlled title/object.
            gsap.fromTo(
                [".orbital-hero__artwork-caption", ".orbital-hero__artwork-index"],
                { y: 14, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.14, ease: "power3.out" }
            );

            const scene = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    // Let the document keep moving while the hero animates.
                    // Pinning here made the first wheel gesture spend itself on the hero,
                    // so the next gesture was needed to reach the next chapter.
                    end: () => `+=${Math.round(window.innerHeight * 0.62)}`,
                    pin: false,
                    scrub: 0.45,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => { scrollProgressRef.current = self.progress; },
                    onRefresh: (self) => { scrollProgressRef.current = self.progress; },
                },
            });

            scene
                .to(lineOneRef.current, { xPercent: -13, yPercent: -24, autoAlpha: 0.12 }, 0)
                .to(lineTwoRef.current, { xPercent: 12, yPercent: -42, autoAlpha: 0.1 }, 0)
                .to(lineThreeRef.current, { xPercent: -5, yPercent: -58, autoAlpha: 0.06 }, 0)
                .to(artworkRef.current, { scale: 1.1, xPercent: -2, yPercent: -2, rotation: 2 }, 0)
                .to(".orbital-hero__support", { y: -44, autoAlpha: 0.05 }, 0.18)
                .to(".orbital-hero__eyebrow, .orbital-hero__footer", { autoAlpha: 0.05 }, 0.12);
        }, hero);

        // Wait until the first layout has painted before measuring the pin range.
        const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            window.cancelAnimationFrame(refreshId);
            scrollProgressRef.current = 0;
            context.revert();
        };
    }, [reducedMotion]);

    const handleScrollToArchive = () => {
        document.getElementById("projects")?.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start",
        });
    };

    return (
        <>
            <section
                id="home"
                ref={heroRef}
                className="story-chapter story-chapter--hero orbital-hero relative isolate w-full overflow-clip"
                aria-labelledby="hero-title"
            >
                <div className="orbital-hero__inner">
                    <div className="orbital-hero__eyebrow">
                        <span className="orbital-hero__status" aria-hidden="true" />
                        <span>SOFTWARE ENGINEER</span>
                        <span className="orbital-hero__eyebrow-divider">/</span>
                        <span>MOBILE · SYSTEMS · AI</span>
                    </div>

                    <div className="orbital-hero__composition">
                        <div className="orbital-hero__copy">
                            <h1 id="hero-title" className="orbital-hero__title">
                                <span ref={lineOneRef}>I BUILD</span>
                                <span ref={lineTwoRef}>DIGITAL</span>
                                <span ref={lineThreeRef} className="orbital-hero__title-accent">WORLDS<span className="orbital-hero__period">.</span></span>
                            </h1>

                            <div className="orbital-hero__support">
                                <p className="orbital-hero__description">
                                    I build thoughtful digital products across <strong>React Native</strong>,
                                    resilient backend systems, and computer vision.
                                </p>

                                <div className="orbital-hero__actions">
                                    <button type="button" onClick={handleScrollToArchive} className="orbital-hero__button orbital-hero__button--primary">
                                        Explore projects <ArrowDown size={16} aria-hidden="true" />
                                    </button>
                                    <button type="button" onClick={() => setIsResumeOpen(true)} className="orbital-hero__button orbital-hero__button--secondary">
                                        View résumé
                                    </button>
                                    <a href="#contact" className="orbital-hero__text-link">Get in touch <span aria-hidden="true">↗</span></a>
                                </div>
                            </div>
                        </div>

                        <div ref={artworkRef} className="orbital-hero__artwork" aria-hidden="true">
                            <div className="orbital-hero__artwork-caption">
                                <span>STUDY NO. 001</span>
                                <span>FORM / MOTION</span>
                            </div>
                            {shouldLoadScene && !reducedMotion ? (
                                <Suspense fallback={<SceneFallback className="h-full w-full" />}>
                                    <PortfolioCanvas scrollProgressRef={scrollProgressRef} className="h-full w-full" />
                                </Suspense>
                            ) : (
                                <SceneFallback className="h-full w-full" />
                            )}
                            <div className="orbital-hero__artwork-index">OA—01</div>
                        </div>
                    </div>

                    <div className="orbital-hero__footer">
                        <span>CHENNAI, INDIA</span>
                        <a href="#projects" onClick={(event) => { event.preventDefault(); handleScrollToArchive(); }}>
                            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
                        </a>
                        <span>BUILT WITH INTENTION</span>
                    </div>
                </div>
            </section>

            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
}
