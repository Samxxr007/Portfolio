import { useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }) {
    const resumeUrl = "/Sameer_Ahmed_G_Resume.pdf";
    const embedUrl = "/Sameer_Ahmed_G_Resume.pdf";

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
                    {/* Backdrop */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black/75 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", damping: 25, stiffness: 260 }}
                        className="relative w-full max-w-5xl h-[88vh] bg-slate-950 border border-slate-800/80 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-10"
                    >
                        {/* Header Bar */}
                        <div className="px-6 py-4 border-b border-slate-800/70 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50"
                                    style={{ color: "var(--color-accent)" }}
                                >
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white leading-tight">
                                        Sameer Ahmed G — Resume
                                    </h3>
                                    <p className="text-xs text-slate-400">Software Engineer · React Native & Full Stack</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                                    title="Open in new tab"
                                >
                                    <ExternalLink size={14} /> Open
                                </a>

                                <a
                                    href={resumeUrl}
                                    download="Sameer_Ahmed_G_Resume.pdf"
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 transition-all hover:brightness-110 shadow-md"
                                    style={{ backgroundColor: "var(--color-accent)" }}
                                    title="Download PDF"
                                >
                                    <Download size={14} /> Download
                                </a>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
                                    aria-label="Close modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Preview Iframe */}
                        <div className="flex-1 w-full bg-slate-900/30 relative">
                            <iframe
                                src={embedUrl}
                                title="Sameer Ahmed G Resume"
                                className="w-full h-full border-0"
                                allow="autoplay"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
