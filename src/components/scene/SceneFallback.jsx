export default function SceneFallback({ className = "" }) {
    return (
        <div
            className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}
            aria-label="The Sculptural Core architectural fallback"
        >
            {/* Soft Warm Radial Ambient Halo */}
            <div
                className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-[100px] opacity-15 pointer-events-none"
                style={{ backgroundColor: "#FF4F2B" }}
            />

            {/* Architectural Graphic Silhouette */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                {/* Asymmetrical Travertine Monolith */}
                <div className="relative w-32 h-52 md:w-40 md:h-64 bg-gradient-to-b from-[#FAF8F5] via-[#E8E2D6] to-[#D5CEC0] border border-[#D8D4CC] rounded-xl shadow-lg flex flex-col justify-between p-4 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-[#D8D4CC] pb-2">
                        <span className="h-2 w-2 rounded-full bg-[#FF4F2B]" />
                        <span className="font-mono text-[9px] text-[#6B6861] tracking-widest">SCULPT.CORE</span>
                    </div>

                    <div className="my-auto pl-2 border-l-2 border-[#151515]">
                        <span className="font-display font-bold text-sm tracking-tight text-[#151515] block">ARCHIVE</span>
                        <span className="font-mono text-[9px] text-[#6B6861]">01 // ORBITAL</span>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[8px] text-[#6B6861] pt-2 border-t border-[#D8D4CC]">
                        <span>#F5F1E8</span>
                        <span className="text-[#FF4F2B] font-bold">SIGNAL ORANGE</span>
                    </div>
                </div>

                {/* Sweeping Signal Orange Contour Ribbon representation */}
                <div
                    className="absolute inset-1 rounded-[42%] border-4 border-[#FF4F2B] -rotate-12 pointer-events-none shadow-[0_0_20px_rgba(255,79,43,0.2)]"
                />
            </div>
        </div>
    );
}
