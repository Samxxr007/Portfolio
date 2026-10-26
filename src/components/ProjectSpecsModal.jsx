import { useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Cpu, ArrowUpRight } from "lucide-react";

export default function ProjectSpecsModal({ project, isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
                    {/* Backdrop */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24 }}
                        className="fixed inset-0 bg-[#151515]/75 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-2xl bg-[#F5F1E8] border border-[#D8D4CC] rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden z-10 text-[#151515]"
                    >
                        {/* Header Banner */}
                        <div className="p-6 sm:p-8 border-b border-[#D8D4CC]/80 bg-[#EFEBE0] relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-[#151515]/5 hover:bg-[#151515]/10 text-[#6B6861] hover:text-[#151515] transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#151515] text-[#F5F1E8] font-bold">
                                    {project.status}
                                </span>
                                <span className="font-mono text-xs text-[#6B6861]">
                                    {project.category}
                                </span>
                            </div>

                            <div className="flex items-start gap-3 mt-2">
                                <div className="p-2.5 rounded-2xl bg-[#151515] text-[#FF4F2B] shrink-0 mt-0.5">
                                    <Cpu size={22} />
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-2xl sm:text-3xl text-[#151515] tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="font-mono text-xs font-bold text-[#FF4F2B] mt-1 tracking-wide">
                                        {project.metric}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                            {/* Summary */}
                            <div>
                                <h4 className="font-mono text-[11px] uppercase tracking-widest text-[#6B6861] mb-2 font-bold">
                                    Engineering Synopsis
                                </h4>
                                <p className="text-sm sm:text-[15px] leading-relaxed text-[#2D2B28]">
                                    {project.description}
                                </p>
                            </div>

                            {/* Architecture Flow */}
                            {project.architecture && (
                                <div className="p-4 rounded-2xl bg-[#ECE7DC] border border-[#D8D4CC]">
                                    <h4 className="font-mono text-[11px] uppercase tracking-widest text-[#6B6861] mb-2 font-bold">
                                        System Architecture Pipeline
                                    </h4>
                                    <p className="font-mono text-xs leading-relaxed text-[#151515] break-words">
                                        {project.architecture}
                                    </p>
                                </div>
                            )}

                            {/* Verified Highlights */}
                            {project.highlights && (
                                <div>
                                    <h4 className="font-mono text-[11px] uppercase tracking-widest text-[#6B6861] mb-3 font-bold">
                                        Technical Deliverables
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {project.highlights.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D2B28]">
                                                <CheckCircle2 size={16} className="text-[#FF4F2B] shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies */}
                            {project.tags && (
                                <div>
                                    <h4 className="font-mono text-[11px] uppercase tracking-widest text-[#6B6861] mb-2.5 font-bold">
                                        Stack Implementation
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-xs px-3 py-1 rounded-full bg-[#E5DFD3] text-[#151515] border border-[#D8D4CC]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-5 sm:p-6 border-t border-[#D8D4CC]/80 bg-[#EFEBE0] flex items-center justify-between gap-4">
                            <span className="font-mono text-[11px] text-[#6B6861] uppercase tracking-widest hidden sm:inline">
                                Verified Local Engineering
                            </span>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#151515] text-[#151515] hover:border-[#FF4F2B] hover:text-[#FF4F2B] font-semibold text-xs transition-colors"
                                    >
                                        <Github size={15} />
                                        <span>Source</span>
                                    </a>
                                )}

                                {project.deploy && (
                                    <a
                                        href={project.deploy}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#151515] text-[#F5F1E8] hover:bg-[#FF4F2B] font-bold text-xs tracking-wide transition-colors"
                                    >
                                        <span>Launch App</span>
                                        <ArrowUpRight size={15} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </Motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
