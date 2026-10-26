import { useState, useRef, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Cpu, Layers, ExternalLink, Activity, ArrowDown } from "lucide-react";
import PortfolioCanvas from "./scene/PortfolioCanvas";
import ResumeModal from "./ResumeModal";
import ProjectSpecsModal from "./ProjectSpecsModal";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { projects } from "../data/projects";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);
    const reducedMotion = useReducedMotion();

    // Scroll progress ref passed directly to 3D Canvas / OrbitalCore
    const scrollProgressRef = useRef(0);

    // DOM Refs for GSAP ScrollTrigger orchestration
    const pinContainerRef = useRef(null);
    const canvasWrapRef = useRef(null);
    const chapterAContentRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const narrativeRef = useRef(null);
    const actionsRef = useRef(null);
    const metaStripRef = useRef(null);
    const ribbonRef = useRef(null);
    const chapterCRef = useRef(null);

    // Verified IndiaX project data
    const indiaX = projects.find((p) => p.id === "indiax") || projects[0];

    useEffect(() => {
        // Accessibility check: do not pin or scrub if user prefers reduced motion
        if (reducedMotion || typeof window === "undefined") return;

        const container = pinContainerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=220%",
                    pin: true,
                    scrub: 0.75,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        scrollProgressRef.current = self.progress;
                    }
                }
            });

            // ── PHASE 1: Chapter A Deconstruction (Scroll 0 -> 0.40) ──
            tl.to(line1Ref.current, { x: -140, opacity: 0.12, ease: "power2.inOut" }, 0);
            tl.to(line2Ref.current, { x: 90, opacity: 0.12, ease: "power2.inOut" }, 0);
            tl.to(line3Ref.current, { scale: 1.08, x: -40, y: 40, opacity: 0.18, ease: "power2.inOut" }, 0);
            tl.to(narrativeRef.current, { opacity: 0, y: -25, ease: "power2.out" }, 0);
            tl.to(actionsRef.current, { opacity: 0, y: -15, ease: "power2.out" }, 0);
            tl.to(metaStripRef.current, { opacity: 0, ease: "power2.out" }, 0);
            tl.to(canvasWrapRef.current, { scale: 0.72, x: 80, y: -60, opacity: 0.28, ease: "power2.inOut" }, 0);
            tl.set(chapterAContentRef.current, { pointerEvents: "none" }, 0.25);

            // ── PHASE 2: Chapter B Graphic Ribbon (Scroll 0.18 -> 0.58) ──
            tl.fromTo(
                ribbonRef.current,
                { xPercent: 100, opacity: 0 },
                { xPercent: 0, opacity: 1, ease: "power2.out" },
                0.18
            );
            tl.to(
                ribbonRef.current,
                { xPercent: -100, opacity: 0, ease: "power2.in" },
                0.48
            );

            // ── PHASE 3: Chapter C Project Scene Reveal (Scroll 0.45 -> 1.0) ──
            tl.fromTo(
                chapterCRef.current,
                { opacity: 0, y: 70, scale: 0.95, pointerEvents: "none" },
                { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", ease: "power3.out" },
                0.48
            );
        }, container);

        return () => ctx.revert();
    }, [reducedMotion]);

    const handleScrollToArchive = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: window.innerHeight * 1.5,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            <section
                id="home"
                ref={pinContainerRef}
                className={`relative w-full ${reducedMotion ? "min-h-screen" : "h-screen"} bg-[#F5F1E8] select-none overflow-hidden`}
            >
                {/* ── PERSISTENT 3D SCULPTURAL CORE ── */}
                <div
                    ref={canvasWrapRef}
                    className="absolute right-0 top-0 w-full lg:w-[50%] h-full pointer-events-none z-10 flex items-center justify-center lg:justify-end pr-4 sm:pr-8 md:pr-14"
                >
                    <div className="w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[660px] max-w-[580px]">
                        <PortfolioCanvas scrollProgressRef={scrollProgressRef} className="w-full h-full" />
                    </div>
                </div>

                {/* ── CHAPTER A: THE ENTRANCE ── */}
                <div
                    ref={chapterAContentRef}
                    className="relative w-full h-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1520px] mx-auto z-20 pointer-events-auto"
                >
                    {/* Typographic & Narrative Editorial Grid */}
                    <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-2 sm:py-6">
                        <div className="lg:col-span-8 flex flex-col justify-center">
                            {/* Discreet Monospace Discipline Label */}
                            <Motion.span
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#6B6861] uppercase mb-4 sm:mb-6 block"
                            >
                                SAMEER AHMED G // SOFTWARE ENGINEER // MOBILE & SYSTEMS
                            </Motion.span>

                            {/* Three-Line Screen-Dominating Editorial Headline */}
                            <div className="flex flex-col tracking-tighter">
                                <span
                                    ref={line1Ref}
                                    className="font-display font-black text-[clamp(4.2rem,8.4vw,8.6rem)] leading-[0.84] text-[#151515] uppercase block will-change-transform"
                                >
                                    I BUILD
                                </span>
                                <span
                                    ref={line2Ref}
                                    className="font-display font-black text-[clamp(4.2rem,8.4vw,8.6rem)] leading-[0.84] text-[#151515] uppercase block will-change-transform"
                                >
                                    DIGITAL
                                </span>
                                <span
                                    ref={line3Ref}
                                    className="font-display font-black text-[clamp(4.2rem,8.4vw,8.6rem)] leading-[0.84] uppercase block will-change-transform"
                                    style={{ color: "#FF4F2B" }}
                                >
                                    WORLDS.
                                </span>
                            </div>

                            {/* Concise Narrative */}
                            <div ref={narrativeRef} className="will-change-transform">
                                <p className="text-base sm:text-[17px] text-[#2D2B28] font-light leading-relaxed max-w-xl mt-6 sm:mt-8 mb-8 sm:mb-10">
                                    Architecting high-performance mobile applications with{" "}
                                    <strong className="font-semibold text-[#151515]">React Native & Expo</strong>, resilient microservices in{" "}
                                    <strong className="font-semibold text-[#151515]">Go</strong>, and real-time computer vision systems.
                                </p>
                            </div>

                            {/* Editorial Primary Actions */}
                            <div ref={actionsRef} className="flex flex-wrap items-center gap-5 sm:gap-6 will-change-transform">
                                <button
                                    onClick={handleScrollToArchive}
                                    className="px-8 py-3.5 rounded-full bg-[#151515] text-[#F5F1E8] font-bold text-sm tracking-wide hover:bg-[#FF4F2B] transition-colors duration-200 shadow-sm flex items-center gap-2"
                                >
                                    <span>Explore Archive</span>
                                    <ArrowDown size={15} />
                                </button>

                                <button
                                    onClick={() => setIsResumeOpen(true)}
                                    className="px-7 py-3.5 rounded-full border border-[#151515] text-[#151515] font-semibold text-sm hover:border-[#FF4F2B] hover:text-[#FF4F2B] transition-colors duration-200"
                                >
                                    View Resume
                                </button>

                                <a
                                    href="#contact"
                                    className="font-mono text-xs uppercase tracking-widest text-[#6B6861] hover:text-[#151515] transition-colors duration-200 py-2"
                                >
                                    Get in Touch →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Metadata Alignment Strip */}
                    <div
                        ref={metaStripRef}
                        className="w-full flex items-center justify-between pt-6 border-t border-[#D8D4CC]/70 font-mono text-[11px] text-[#6B6861] will-change-transform"
                    >
                        <span className="tracking-wider uppercase">
                            TRUCK HAI INTERN · SAVEETHA SE
                        </span>

                        <button
                            onClick={handleScrollToArchive}
                            className="text-[#151515] hover:text-[#FF4F2B] transition-colors uppercase tracking-widest font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                            <span>Scroll to explore</span>
                            <span>↓</span>
                        </button>

                        <span className="hidden sm:inline tracking-wider uppercase">
                            CHENNAI, INDIA // 2026
                        </span>
                    </div>
                </div>

                {/* ── CHAPTER B: THE TRANSITION RIBBON ── */}
                <div
                    ref={ribbonRef}
                    className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center opacity-0 will-change-transform"
                >
                    <div className="w-full bg-[#ECE7DC] border-y border-[#D8D4CC] py-8 sm:py-12 shadow-lg backdrop-blur-sm px-6 sm:px-12 md:px-16 lg:px-20">
                        <div className="max-w-[1520px] mx-auto flex flex-col gap-3">
                            {/* Classification Metadata */}
                            <div className="flex items-center justify-between font-mono text-[11px] text-[#6B6861] tracking-widest uppercase">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#FF4F2B] inline-block" />
                                    CHAPTER 02 // ARCHITECTURAL TRANSFORMATION
                                </span>
                                <span>[INDEX 01 / 04] · LAT 13.0827° N</span>
                            </div>

                            {/* Panoramic Graphic Editorial Marquee */}
                            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#151515] tracking-tight uppercase leading-tight">
                                DISTRIBUTED PIPELINES · COMPUTER VISION INFERENCE · CROSS-PLATFORM MOBILE
                            </h2>

                            {/* Connective Narrative Statement */}
                            <p className="font-mono text-xs sm:text-sm text-[#2D2B28] tracking-wide mt-1">
                                Connecting algorithmic models and low-level protocols into resilient, production-grade digital realities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── CHAPTER C: THE ENGINEERING ARCHIVE (PROJECT 01: INDIAX) ── */}
                <div
                    ref={chapterCRef}
                    id="archive"
                    className="absolute inset-0 z-40 bg-[#F5F1E8] flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1520px] mx-auto opacity-0 pointer-events-none will-change-transform"
                >
                    {/* Top Architectural Classification */}
                    <div className="w-full flex items-center justify-between border-b border-[#D8D4CC]/80 pb-4">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4F2B] animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#151515]">
                                {indiaX.category}
                            </span>
                            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#151515] text-[#F5F1E8] font-semibold uppercase">
                                {indiaX.status}
                            </span>
                        </div>

                        <span className="font-mono text-xs text-[#6B6861] uppercase tracking-wider hidden sm:inline">
                            ENGINEERING ARCHIVE // SPECIFICATION 01
                        </span>
                    </div>

                    {/* Central Panoramic Project Feature Composition */}
                    <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">
                        {/* Left Feature Column: Typographic Prominence & Metrics (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            {/* Oversized Number Watermark + Title */}
                            <div className="relative mb-3">
                                <span className="absolute -top-10 -left-4 font-display font-black text-7xl sm:text-9xl text-[#D8D4CC]/40 select-none -z-10 leading-none">
                                    01
                                </span>
                                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#151515] tracking-tight uppercase leading-[0.95]">
                                    {indiaX.title}
                                </h3>
                                <p className="font-mono text-sm sm:text-base text-[#6B6861] mt-2 font-medium">
                                    {indiaX.subtitle}
                                </p>
                            </div>

                            {/* Editorial Synopsis */}
                            <p className="text-sm sm:text-base text-[#2D2B28] leading-relaxed max-w-xl my-4">
                                {indiaX.description}
                            </p>

                            {/* Verified Key Metrics Plaque */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 p-4 rounded-2xl bg-[#ECE7DC] border border-[#D8D4CC]">
                                <div>
                                    <span className="font-mono text-[10px] uppercase text-[#6B6861] tracking-wider block">
                                        Intelligence
                                    </span>
                                    <span className="font-display font-black text-base sm:text-lg text-[#151515] block mt-0.5">
                                        7 ML Models
                                    </span>
                                </div>
                                <div>
                                    <span className="font-mono text-[10px] uppercase text-[#6B6861] tracking-wider block">
                                        Harvest Compliance
                                    </span>
                                    <span className="font-display font-black text-base sm:text-lg text-[#FF4F2B] block mt-0.5">
                                        100% PHI Precision
                                    </span>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <span className="font-mono text-[10px] uppercase text-[#6B6861] tracking-wider block">
                                        Scope
                                    </span>
                                    <span className="font-display font-black text-base sm:text-lg text-[#151515] block mt-0.5">
                                        Crops & Livestock
                                    </span>
                                </div>
                            </div>

                            {/* Verified Direct Actions */}
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                {indiaX.deploy && (
                                    <a
                                        href={indiaX.deploy}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#151515] text-[#F5F1E8] hover:bg-[#FF4F2B] font-bold text-xs tracking-wide transition-colors shadow-sm"
                                    >
                                        <span>Launch Application</span>
                                        <ArrowUpRight size={15} />
                                    </a>
                                )}

                                {indiaX.github && (
                                    <a
                                        href={indiaX.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#151515] text-[#151515] hover:border-[#FF4F2B] hover:text-[#FF4F2B] font-semibold text-xs transition-colors"
                                    >
                                        <Github size={15} />
                                        <span>View Repository</span>
                                    </a>
                                )}

                                <button
                                    onClick={() => setIsSpecsOpen(true)}
                                    className="font-mono text-xs uppercase tracking-widest text-[#6B6861] hover:text-[#151515] transition-colors py-2"
                                >
                                    Architecture Specs & Highlights →
                                </button>
                            </div>
                        </div>

                        {/* Right Feature Column: Visual Architecture Pipeline (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            <div className="p-6 rounded-3xl bg-[#ECE7DC] border border-[#D8D4CC] flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-[#D8D4CC] pb-3">
                                    <div className="flex items-center gap-2">
                                        <Cpu size={16} className="text-[#FF4F2B]" />
                                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#151515]">
                                            System Pipeline
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10px] text-[#6B6861] uppercase">
                                        Verified Architecture
                                    </span>
                                </div>

                                {/* Interactive Pipeline Diagram Flow */}
                                <div className="space-y-3 font-mono text-xs">
                                    <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#D8D4CC] flex items-center justify-between">
                                        <span className="font-bold text-[#151515]">01. Client Interface</span>
                                        <span className="text-[#6B6861] text-[11px]">React 19 + TypeScript</span>
                                    </div>
                                    <div className="flex justify-center text-[#FF4F2B]">
                                        <span>↓</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#D8D4CC] flex items-center justify-between">
                                        <span className="font-bold text-[#151515]">02. API Gateway</span>
                                        <span className="text-[#6B6861] text-[11px]">FastAPI Async Service</span>
                                    </div>
                                    <div className="flex justify-center text-[#FF4F2B]">
                                        <span>↓</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#D8D4CC] flex items-center justify-between">
                                        <span className="font-bold text-[#151515]">03. Inference Core</span>
                                        <span className="text-[#FF4F2B] font-bold text-[11px]">7 Scikit / XGBoost Models</span>
                                    </div>
                                    <div className="flex justify-center text-[#FF4F2B]">
                                        <span>↓</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#D8D4CC] flex items-center justify-between">
                                        <span className="font-bold text-[#151515]">04. Persistence Layer</span>
                                        <span className="text-[#6B6861] text-[11px]">Prisma ORM & PostgreSQL</span>
                                    </div>
                                </div>

                                {/* Tech Tag Pills */}
                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#D8D4CC]">
                                    {indiaX.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#E5DFD3] text-[#151515]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="w-full flex items-center justify-between pt-4 border-t border-[#D8D4CC]/80 font-mono text-[11px] text-[#6B6861]">
                        <span className="tracking-wider uppercase">
                            FLAGSHIP ARCHIVE 01 // 04
                        </span>

                        <a
                            href="#projects"
                            className="text-[#151515] hover:text-[#FF4F2B] transition-colors uppercase tracking-widest font-semibold flex items-center gap-1.5"
                        >
                            <span>Continue to full archive</span>
                            <span>↓</span>
                        </a>

                        <span className="hidden sm:inline tracking-wider uppercase">
                            SIH 2026 PROTOTYPE
                        </span>
                    </div>
                </div>
            </section>

            {/* Technical Specifications Modal for IndiaX */}
            <ProjectSpecsModal
                project={indiaX}
                isOpen={isSpecsOpen}
                onClose={() => setIsSpecsOpen(false)}
            />

            {/* Preserved Resume Modal Integration */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
}
