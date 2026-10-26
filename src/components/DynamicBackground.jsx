export default function DynamicBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#F5F1E8]">
            {/* Subtle, soft ambient atmospheric wash without grids or geometric patterns */}
            <div
                className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.09] pointer-events-none"
                style={{ backgroundColor: "#FF4F2B" }}
            />
            <div
                className="absolute bottom-1/3 left-1/5 w-[550px] h-[550px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
                style={{ backgroundColor: "#D8D4CC" }}
            />
        </div>
    );
}
