import { useState } from "react";

export function useWebGL() {
    const [isSupported] = useState(() => {
        if (typeof window === "undefined") return true;
        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
            return Boolean(gl);
        } catch {
            return false;
        }
    });

    return isSupported;
}

