import { motion as Motion, AnimatePresence } from "framer-motion";
import { Settings, X, Droplet } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeCustomizer() {
    const { accentColor, THEMES, changeTheme, isCustomizerOpen, openCustomizer, closeCustomizer } = useTheme();

    return (
        <>
            {/* Floating Toggle Button (Hidden when customizer panel is open) */}
            <AnimatePresence>
                {!isCustomizerOpen && (
                    <Motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed right-5 bottom-6 md:right-8 md:bottom-8 z-30 p-3.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-[0_4px_25px_rgba(0,0,0,0.6)] text-slate-300 hover:text-white transition-all flex items-center justify-center group hover:border-[color:var(--color-accent)]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={openCustomizer}
                        aria-label="Open Theme Customizer"
                    >
                        <span className="hidden md:block absolute right-full mr-3 bg-slate-900/90 text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 pointer-events-none shadow-xl">
                            Customize Theme
                        </span>
                        <Droplet size={20} style={{ color: "var(--color-accent)" }} />
                    </Motion.button>
                )}
            </AnimatePresence>

            {/* Slide-out Panel Backdrop */}
            <AnimatePresence>
                {isCustomizerOpen && (
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        onClick={closeCustomizer}
                    />
                )}
            </AnimatePresence>

            {/* Slide-out Panel */}
            <AnimatePresence>
                {isCustomizerOpen && (
                    <Motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-950 border-l border-slate-800 shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Settings className="text-slate-400" size={20} />
                                        Theme Customizer
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">Personalize your experience</p>
                                </div>
                                <button
                                    onClick={closeCustomizer}
                                    className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                                    aria-label="Close Theme Customizer"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-xs font-semibold text-slate-500 tracking-wider mb-4 uppercase">Color Themes</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {THEMES.map((theme) => (
                                        <button
                                            key={theme.id}
                                            onClick={() => changeTheme(theme.id)}
                                            className={`flex flex-col overflow-hidden rounded-lg border text-left transition-all ${accentColor.id === theme.id ? "border-[var(--color-accent)] bg-slate-900" : "border-slate-800 hover:border-slate-600 bg-slate-900/50"
                                                }`}
                                        >
                                            <div className="h-6 w-full flex">
                                                <div className="w-1/2 bg-slate-900"></div>
                                                <div className="w-1/2" style={{ backgroundColor: theme.color }}></div>
                                            </div>
                                            <div className="px-3 py-2 text-xs font-medium text-slate-300 flex items-center justify-between">
                                                {theme.name}
                                                {accentColor.id === theme.id && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }}></span>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 tracking-wider mb-4 uppercase">Accent Color</h4>
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {THEMES.map((theme) => (
                                        <button
                                            key={`accent-${theme.id}`}
                                            onClick={() => changeTheme(theme.id)}
                                            className="w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center"
                                            style={{
                                                backgroundColor: theme.color,
                                                borderColor: accentColor.id === theme.id ? "white" : "transparent"
                                            }}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={() => changeTheme(THEMES[0].id)}
                                    className="w-full py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium border border-slate-700 hover:bg-slate-800 bg-slate-900 text-slate-300 hover:text-white transition-all"
                                >
                                    Reset to Default
                                </button>
                            </div>
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
