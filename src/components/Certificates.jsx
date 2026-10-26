import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ChevronLeft, ChevronRight, Camera, ExternalLink } from "lucide-react";

// Image Imports
import nvidiaImg from "../assets/certificates/nvidia.jpg";
import googleCloudImg from "../assets/certificates/google-cloud.png";
import ibmImg from "../assets/certificates/ibm.png";
import bcgxImg from "../assets/certificates/bcg-x.jpg";
import nptelImg from "../assets/certificates/nptel.jpg";
import corizoInternImg from "../assets/certificates/corizo-internship.jpg";
import corizoTrainImg from "../assets/certificates/corizo-training.jpg";

const certificates = [
    {
        title: "AI for All: From Basics to GenAI Practice",
        issuer: "NVIDIA Academy",
        date: "November 2025",
        image: nvidiaImg,
        verified: true,
    },
    {
        title: "Introduction to Generative AI",
        issuer: "Google Cloud / Simplilearn",
        date: "November 2025",
        image: googleCloudImg,
        verified: true,
    },
    {
        title: "AI Literacy",
        issuer: "IBM SkillsBuild",
        date: "November 2025",
        image: ibmImg,
        verified: true,
    },
    {
        title: "GenAI Job Simulation",
        issuer: "BCG X (Forage)",
        date: "November 2025",
        image: bcgxImg,
        verified: true,
    },
    {
        title: "Introduction to Internet of Things",
        issuer: "NPTEL (IIT Kharagpur)",
        date: "October 2025",
        image: nptelImg,
        verified: true,
        score: "77% / Elite",
    },
    {
        title: "Web Development Internship",
        issuer: "Mood Indigo (IIT-B) / Corizo",
        date: "July 2025",
        image: corizoInternImg,
        verified: true,
    },
    {
        title: "Web Development Training",
        issuer: "Corizo",
        date: "July 2025",
        image: corizoTrainImg,
        verified: true,
        credentialUrl: "https://credentials.corizo.in/credential/a13bc29d-3986-448b-a461-6b773f18b772"
    }
];

export default function Certificates() {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [cardWidth, setCardWidth] = useState(0);

    // Calculate card width for precise scrolling
    useEffect(() => {
        const updateWidth = () => {
            if (scrollRef.current) {
                const firstCard = scrollRef.current.querySelector('.cert-card');
                if (firstCard) {
                    setCardWidth(firstCard.offsetWidth + 32); // width + gap
                }
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const slideNext = useCallback(() => {
        if (!scrollRef.current) return;
        const nextIndex = (currentIndex + 1) % certificates.length;
        setCurrentIndex(nextIndex);
        scrollRef.current.scrollTo({
            left: nextIndex * cardWidth,
            behavior: "smooth"
        });
    }, [currentIndex, cardWidth]);

    const slidePrev = useCallback(() => {
        if (!scrollRef.current) return;
        const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        setCurrentIndex(prevIndex);
        scrollRef.current.scrollTo({
            left: prevIndex * cardWidth,
            behavior: "smooth"
        });
    }, [currentIndex, cardWidth]);

    // Auto-play logic
    useEffect(() => {
        let interval;
        if (isAutoPlaying && cardWidth > 0) {
            interval = setInterval(slideNext, 4000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, slideNext, cardWidth]);

    const handleDotClick = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
        scrollRef.current.scrollTo({
            left: index * cardWidth,
            behavior: "smooth"
        });
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    return (
        <section id="certificates" className="story-chapter story-chapter--certificates">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="chapter-head certificates-heading"
                >
                    <h2 className="chapter-heading certificates-title text-4xl md:text-5xl font-bold text-white mb-6 italic font-serif leading-tight">
                        Academic & Professional <span style={{ color: "var(--color-accent)" }}>Accolades</span>
                    </h2>
                </motion.div>

                <div className="relative group/slider">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => { setIsAutoPlaying(false); slidePrev(); setTimeout(() => setIsAutoPlaying(true), 8000); }}
                        className="absolute left-0 top-[40%] -translate-y-1/2 z-30 p-4 rounded-full bg-slate-900/80 border border-slate-800 text-white hover:bg-[color:var(--color-accent)] hover:text-slate-950 transition-all duration-300 -ml-4 md:-ml-8 shadow-2xl backdrop-blur-md"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={() => { setIsAutoPlaying(false); slideNext(); setTimeout(() => setIsAutoPlaying(true), 8000); }}
                        className="absolute right-0 top-[40%] -translate-y-1/2 z-30 p-4 rounded-full bg-slate-900/80 border border-slate-800 text-white hover:bg-[color:var(--color-accent)] hover:text-slate-950 transition-all duration-300 -mr-4 md:-mr-8 shadow-2xl backdrop-blur-md"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-auto no-scrollbar py-8 px-4 snap-x snap-mandatory scroll-smooth"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        {certificates.map((cert, index) => (
                            <div
                                key={index}
                                className="cert-card min-w-[320px] md:min-w-[420px] snap-start"
                            >
                                <div className="glass-card rounded-[2.5rem] border border-slate-800/60 bg-slate-900/40 overflow-hidden flex flex-col h-full shadow-2xl hover:border-[color:var(--color-accent)]/30 transition-colors duration-500">
                                    {/* Image Section */}
                                    <div className="aspect-[1.4] relative overflow-hidden bg-slate-950">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover object-top"
                                        />

                                        {/* Verified Badge */}
                                        {cert.credentialUrl ? (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer me"
                                                className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/40 hover:border-emerald-400 shadow-2xl transition-all group/badge"
                                                title="View official credential"
                                            >
                                                <CheckCircle2 size={12} className="text-emerald-400" />
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">Verified</span>
                                                <ExternalLink size={10} className="text-emerald-400 group-hover/badge:translate-x-0.5 transition-transform" />
                                            </a>
                                        ) : (
                                            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                                                <CheckCircle2 size={12} className="text-emerald-400" />
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">Verified</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section - Clear below the image */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div
                                                className="p-3 rounded-2xl bg-slate-950 shadow-inner mt-1 shrink-0 border border-slate-800/50"
                                                style={{ color: "var(--color-accent)" }}
                                            >
                                                <Award size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white leading-tight mb-2">
                                                    {cert.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm font-semibold tracking-wide">
                                                    {cert.issuer}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-800/40">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Issue Date</span>
                                                <span className="text-xs font-black uppercase tracking-[0.1em] text-white">
                                                    {cert.date}
                                                </span>
                                            </div>
                                            {cert.score ? (
                                                <div className="text-right">
                                                    <span className="text-[10px] uppercase font-bold text-emerald-500/60 tracking-widest mb-1 block">Score</span>
                                                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">{cert.score}</span>
                                                </div>
                                            ) : cert.credentialUrl ? (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer me"
                                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 hover:text-sky-300 hover:underline transition-colors"
                                                >
                                                    <span>Credential</span>
                                                    <ExternalLink size={11} />
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center items-center gap-3 mt-8">
                        {certificates.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                className={`h-2 transition-all duration-300 rounded-full ${idx === currentIndex
                                    ? "w-8 bg-[color:var(--color-accent)]"
                                    : "w-2 bg-slate-800 hover:bg-slate-700"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
