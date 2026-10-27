import { createContext, useContext, useState, useEffect } from "react";

// Predefined modern color themes with Signal Orange as primary Orbital Archive default
// Theme data is intentionally colocated with its provider/context.
// eslint-disable-next-line react-refresh/only-export-components
export const THEMES = [
    { id: "signal-orange", name: "Signal Orange (Orbital)", color: "#FF5A36", hsl: "11 100% 61%" },
    { id: "ocean-blue", name: "Ocean Blue", color: "#0EA5E9", hsl: "199 89% 48%" },
    { id: "default-gold", name: "Warm Gold", color: "#EAB308", hsl: "45 93% 47%" },
    { id: "rose-pink", name: "Rose Pink", color: "#F43F5E", hsl: "349 89% 60%" },
    { id: "emerald-green", name: "Emerald Green", color: "#10B981", hsl: "160 84% 39%" },
    { id: "royal-purple", name: "Royal Purple", color: "#A855F7", hsl: "271 91% 65%" },
    { id: "sunset-orange", name: "Sunset Orange", color: "#F97316", hsl: "24 95% 53%" },
    { id: "cyan-neon", name: "Cyan Neon", color: "#06B6D4", hsl: "189 94% 43%" },
    { id: "cherry-red", name: "Cherry Red", color: "#EF4444", hsl: "0 84% 60%" }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Initializer function loads saved theme synchronously without cascading render
    const [accentColor, setAccentColor] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("portfolio-theme");
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch {
                    // fall back to default
                }
            }
        }
        return THEMES[0];
    });

    const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

    useEffect(() => {
        // Set CSS variable
        document.documentElement.style.setProperty("--color-accent", accentColor.color);
        document.documentElement.style.setProperty("--color-accent-hsl", accentColor.hsl);
        localStorage.setItem("portfolio-theme", JSON.stringify(accentColor));
    }, [accentColor]);

    const changeTheme = (themeId) => {
        const theme = THEMES.find((t) => t.id === themeId);
        if (theme) setAccentColor(theme);
    };

    const openCustomizer = () => setIsCustomizerOpen(true);
    const closeCustomizer = () => setIsCustomizerOpen(false);

    return (
        <ThemeContext.Provider value={{
            accentColor,
            THEMES,
            changeTheme,
            setCustomAccent: setAccentColor,
            isCustomizerOpen,
            setIsCustomizerOpen,
            openCustomizer,
            closeCustomizer
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
