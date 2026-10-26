import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Fast, brief editorial entrance
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 350);
        }, 750);

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsExiting(true);
                setTimeout(onComplete, 80);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onComplete]);

    const handleSkip = () => {
        setIsExiting(true);
        setTimeout(onComplete, 80);
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F5F1E8] text-[#151515] select-none cursor-pointer transition-opacity duration-300 ${
                isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={handleSkip}
            aria-label="The Orbital Archive Preloader. Click to enter immediately."
        >
            <div className="flex flex-col items-center max-w-sm px-6 text-center">
                {/* Monogram / Brand Mark */}
                <div className="w-14 h-14 rounded-2xl bg-[#EAE5DC] border border-[#D8D4CC] flex items-center justify-center mb-6 shadow-sm relative">
                    <span className="font-display font-black text-2xl text-[#151515]">S</span>
                    <span className="absolute bottom-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#FF4F2B]" />
                </div>

                {/* Subtitle Telemetry */}
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6B6861] mb-1">
                    PORTFOLIO // 2026
                </span>

                {/* Main Name */}
                <h1 className="font-display font-bold text-xl text-[#151515] tracking-tight uppercase mb-6">
                    The Orbital Archive
                </h1>

                {/* Signal Orange Loading Track */}
                <div className="w-44 h-[2px] bg-[#D8D4CC] rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full rounded-full transition-all duration-600 ease-out bg-[#FF4F2B]"
                        style={{
                            width: isExiting ? "100%" : "85%"
                        }}
                    />
                </div>

                <span className="font-mono text-[9px] text-[#6B6861] tracking-wider">
                    CLICK OR PRESS ESC TO ENTER
                </span>
            </div>
        </div>
    );
}
