import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import ResumeModal from "./ResumeModal";

const links = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleResumeClick = () => {
        setIsOpen(false);
        setIsResumeOpen(true);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? "bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#D8D4CC]/80 shadow-[0_2px_12px_rgba(21,21,21,0.03)]"
                        : "bg-transparent"
                }`}
            >
                {/* Scroll Progress Bar in Signal Orange */}
                <Motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left z-50 bg-[#FF4F2B]"
                    style={{ scaleX }}
                />

                <div className="max-w-[1520px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 h-20 flex items-center justify-between">
                    {/* Brand Identifier (Far Left) */}
                    <a
                        href="#home"
                        className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#151515] hover:text-[#FF4F2B] transition-colors select-none"
                    >
                        SAMEER AHMED G
                    </a>

                    {/* Desktop Navigation Links (Right) */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium tracking-tight text-[#151515] hover:text-[#FF4F2B] transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        <button
                            onClick={handleResumeClick}
                            className="font-mono text-xs uppercase tracking-wider font-semibold px-4 py-2 border border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-[#F5F1E8] transition-colors"
                        >
                            Resume
                        </button>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            className="p-2 text-[#151515] hover:text-[#FF4F2B] focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Navigation Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <Motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-20 left-0 right-0 bg-[#F5F1E8] border-b border-[#D8D4CC] flex flex-col items-center py-8 gap-5 md:hidden shadow-lg z-40"
                        >
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-base font-display font-medium text-[#151515] hover:text-[#FF4F2B] transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                onClick={handleResumeClick}
                                className="mt-2 font-mono text-xs uppercase tracking-wider px-6 py-2.5 bg-[#151515] text-[#F5F1E8] font-semibold"
                            >
                                Resume
                            </button>
                        </Motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Preserved Resume Modal */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
    );
}
