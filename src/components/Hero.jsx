import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Cpu, ArrowDown } from "lucide-react";
import PortfolioCanvas from "./scene/PortfolioCanvas";
import ResumeModal from "./ResumeModal";
import ProjectSpecsModal from "./ProjectSpecsModal";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { projects } from "../data/projects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);
    const reducedMotion = useReducedMotion();
    const scrollProgressRef = useRef(0);
    const heroRef = useRef(null);
    const lineOneRef = useRef(null);
    const lineTwoRef = useRef(null);
    const lineThreeRef = useRef(null);
    const artworkRef = useRef(null);
    const indiaX = projects.find((project) => project.id === "indiax") || projects[0];

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
                    end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 760 ? 0.78 : 1.25))}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.38,
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
                className="orbital-hero relative isolate w-full overflow-clip bg-[#F5F1E8] text-[#151515]"
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
                            <PortfolioCanvas scrollProgressRef={scrollProgressRef} className="h-full w-full" />
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

            <section className="orbital-feature" aria-labelledby="featured-project-title">
                <div className="orbital-feature__topline">
                    <span>SELECTED WORK / 001</span>
                    <span>ENGINEERING ARCHIVE</span>
                </div>
                <div className="orbital-feature__layout">
                    <div className="orbital-feature__copy">
                        <p className="orbital-feature__kicker">{indiaX.category} <span>·</span> {indiaX.status}</p>
                        <p className="orbital-feature__number" aria-hidden="true">01</p>
                        <h2 id="featured-project-title" className="orbital-feature__title">{indiaX.title}</h2>
                        {indiaX.subtitle && <p className="orbital-feature__subtitle">{indiaX.subtitle}</p>}
                        <p className="orbital-feature__description">{indiaX.description}</p>
                        <div className="orbital-feature__metrics">
                            <div><span>Models</span><strong>7 ML models</strong></div>
                            <div><span>Scope</span><strong>Crop & livestock</strong></div>
                            <div><span>Focus</span><strong>Traceability</strong></div>
                        </div>
                        <div className="orbital-feature__links">
                            {indiaX.deploy && <a href={indiaX.deploy} target="_blank" rel="noopener noreferrer" className="orbital-hero__button orbital-hero__button--primary">Launch project <ArrowUpRight size={16} aria-hidden="true" /></a>}
                            {indiaX.github && <a href={indiaX.github} target="_blank" rel="noopener noreferrer" className="orbital-hero__button orbital-hero__button--secondary"><Github size={15} aria-hidden="true" /> Source code</a>}
                            <button type="button" onClick={() => setIsSpecsOpen(true)} className="orbital-hero__text-link">Technical details <span aria-hidden="true">↗</span></button>
                        </div>
                    </div>
                    <div className="orbital-feature__diagram" aria-label="IndiaX architecture overview">
                        <div className="orbital-feature__diagram-head"><Cpu size={17} aria-hidden="true" /><span>System architecture</span></div>
                        <div className="orbital-feature__stage"><span>01</span><div><strong>Client interface</strong><small>React · TypeScript</small></div></div>
                        <div className="orbital-feature__connector" aria-hidden="true">↓</div>
                        <div className="orbital-feature__stage"><span>02</span><div><strong>API gateway</strong><small>FastAPI</small></div></div>
                        <div className="orbital-feature__connector" aria-hidden="true">↓</div>
                        <div className="orbital-feature__stage orbital-feature__stage--accent"><span>03</span><div><strong>Inference core</strong><small>Scikit-learn · XGBoost</small></div></div>
                        <div className="orbital-feature__connector" aria-hidden="true">↓</div>
                        <div className="orbital-feature__stage"><span>04</span><div><strong>Persistence layer</strong><small>Prisma · PostgreSQL</small></div></div>
                        <div className="orbital-feature__tags">{indiaX.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                </div>
                <div className="orbital-feature__bottomline"><span>01 / FEATURED PROJECT</span><a href="#projects">Explore complete archive <span aria-hidden="true">↘</span></a></div>
            </section>

            <ProjectSpecsModal project={indiaX} isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
}
