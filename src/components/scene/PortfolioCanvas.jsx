import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import OrbitalCore from "./OrbitalCore";
import SceneLighting from "./SceneLighting";
import SceneFallback from "./SceneFallback";
import { useWebGL } from "../../hooks/useWebGL";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function PortfolioCanvas({ className = "", scrollProgressRef }) {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const hasWebGL = useWebGL();
    const reducedMotion = useReducedMotion();

    // IntersectionObserver to pause the render loop when scrolled off-screen
    useEffect(() => {
        const container = containerRef.current;
        if (!container || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // If WebGL is not available, render the lightweight SVG/CSS architectural fallback
    if (!hasWebGL) {
        return (
            <div ref={containerRef} className={`w-full h-full ${className}`}>
                <SceneFallback />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative pointer-events-none select-none ${className}`}
            aria-hidden="true"
            role="presentation"
        >
            <Canvas
                camera={{ position: [0, 0, 5.8], fov: 42 }}
                // Active continuous rendering when in viewport; completely stopped when off-screen
                frameloop={isVisible ? "always" : "never"}
                dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                }}
            >
                <SceneLighting />
                <OrbitalCore reducedMotion={reducedMotion} scrollProgressRef={scrollProgressRef} />
            </Canvas>
        </div>
    );
}

