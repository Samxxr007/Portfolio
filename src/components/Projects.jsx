import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, ChevronUp, ArrowUpRight, Cpu, Activity, Sparkles } from "lucide-react";
import ClickSpark from "./ClickSpark";
import ProjectSpecsModal from "./ProjectSpecsModal";
import { projects, categories } from "../data/projects";

/**
 * Editorial Flagship Project Card
 */
function FlagshipEditorialCard({ project, onSelect }) {
    return (
        <Motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="group relative flex flex-col justify-between rounded-3xl border border-[#D8D4CC] bg-[#ECE7DC] p-6 sm:p-8 shadow-sm hover:border-[#FF4F2B]/60 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => onSelect(project)}
        >
            <div>
                {/* Header Tag & Classification */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#FF4F2B]">
                            {project.number || "•"}
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#151515] text-[#F5F1E8]">
                            {project.status}
                        </span>
                    </div>

                    <span className="font-mono text-xs text-[#6B6861] uppercase tracking-wider">
                        {project.category}
                    </span>
                </div>

                {/* Project Title */}
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#151515] mb-2 group-hover:text-[#FF4F2B] transition-colors">
                    {project.title}
                </h3>

                {/* Metric Badge */}
                <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#E5DFD3] border border-[#D8D4CC] text-[#151515]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F2B]" />
                        {project.metric}
                    </span>
                </div>

                {/* Narrative Summary */}
                <p className="text-[#2D2B28] text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {project.description}
                </p>
            </div>

            {/* Footer with Tags and CTAs */}
            <div className="pt-4 border-t border-[#D8D4CC] flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#F5F1E8] text-[#151515] border border-[#D8D4CC]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => onSelect(project)}
                        className="font-mono text-xs font-bold text-[#151515] hover:text-[#FF4F2B] transition-colors flex items-center gap-1"
                    >
                        <span>Specifications</span>
                        <span>→</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full border border-[#D8D4CC] bg-[#F5F1E8] hover:border-[#151515] text-[#151515] transition-colors"
                                title="GitHub Source"
                            >
                                <Github size={14} />
                            </a>
                        )}

                        {project.deploy && (
                            <a
                                href={project.deploy}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 rounded-full bg-[#151515] text-[#F5F1E8] hover:bg-[#FF4F2B] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                                <span>Live</span>
                                <ArrowUpRight size={13} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Motion.div>
    );
}

export default function Projects() {
    const [activeTab, setActiveTab] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Flagship projects (excluding IndiaX which is featured in Chapter C)
    const flagshipProjects = projects.filter((p) => p.featured && p.id !== "indiax");
    
    // Other systems in the archive
    const otherProjects = projects.filter((p) => !p.featured || p.id === "indiax");
    const filteredOtherProjects = activeTab === "All"
        ? otherProjects
        : otherProjects.filter((p) => p.category === activeTab);

    return (
        <ClickSpark
            sparkColor="#FF4F2B"
            sparkSize={10}
            sparkRadius={16}
            sparkCount={7}
            duration={400}
            easing="ease-out"
        >
            <section id="projects" className="w-full py-24 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1520px] mx-auto select-none">
                <div className="w-full flex flex-col items-center">
                    
                    {/* Editorial Section Header */}
                    <div className="text-left w-full mb-12 border-b border-[#D8D4CC] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-[#6B6861] mb-2 block">
                                THE EXTENDED ARCHIVE // REMAINING SYSTEMS
                            </span>
                            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#151515] tracking-tight uppercase">
                                Flagship <span style={{ color: "#FF4F2B" }}>Engineering</span>
                            </h2>
                        </div>
                        <p className="font-mono text-xs sm:text-sm text-[#6B6861] max-w-md">
                            Selected production architectures, computer vision pipelines, and automated DevOps ecosystems.
                        </p>
                    </div>

                    {/* Bento Grid for Remaining Flagships (RoadGuard AI, FishConnect AI, Autoship) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full mb-12">
                        {flagshipProjects.map((project) => (
                            <FlagshipEditorialCard
                                key={project.id}
                                project={project}
                                onSelect={(p) => setSelectedProject(p)}
                            />
                        ))}
                    </div>

                    {/* Full Archive Drawer Toggle */}
                    <div className="w-full flex flex-col items-center">
                        <button
                            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#ECE7DC] hover:bg-[#E5DFD3] border border-[#D8D4CC] text-[#151515] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                        >
                            <span>{isDrawerOpen ? "Collapse Extended Index" : `Explore Complete Index (${otherProjects.length} Systems)`}</span>
                            <div className="text-[#FF4F2B]">
                                {isDrawerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </button>

                        {/* Expandable Category Tabbed Drawer */}
                        <AnimatePresence>
                            {isDrawerOpen && (
                                <Motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    className="w-full overflow-hidden pt-8"
                                >
                                    {/* Category Filter Tabs */}
                                    <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-[#ECE7DC] border border-[#D8D4CC] mb-8 max-w-2xl mx-auto">
                                        {categories.map((cat) => {
                                            const isActive = activeTab === cat;
                                            const count = cat === "All" ? otherProjects.length : otherProjects.filter((p) => p.category === cat).length;
                                            return (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveTab(cat)}
                                                    className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors duration-200 flex items-center gap-2 ${
                                                        isActive
                                                            ? "bg-[#151515] text-[#F5F1E8] font-bold"
                                                            : "text-[#6B6861] hover:text-[#151515]"
                                                    }`}
                                                >
                                                    <span>{cat}</span>
                                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-[#FF4F2B] text-white" : "bg-[#D8D4CC] text-[#151515]"}`}>
                                                        {count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Drawer Projects Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                        {filteredOtherProjects.map((project) => (
                                            <div
                                                key={project.id || project.title}
                                                className="group flex flex-col justify-between rounded-2xl border border-[#D8D4CC] bg-[#ECE7DC] p-5 hover:border-[#FF4F2B]/60 transition-all duration-200 cursor-pointer shadow-sm"
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <div>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#151515] text-[#F5F1E8]">
                                                            {project.status}
                                                        </span>
                                                        <span className="font-mono text-[11px] text-[#6B6861]">
                                                            {project.category}
                                                        </span>
                                                    </div>

                                                    <h4 className="font-display font-bold text-base text-[#151515] mb-1.5 group-hover:text-[#FF4F2B] transition-colors line-clamp-1">
                                                        {project.title}
                                                    </h4>

                                                    <p className="font-mono text-[11px] text-[#FF4F2B] font-semibold mb-2 line-clamp-1">
                                                        {project.metric}
                                                    </p>

                                                    <p className="text-[#2D2B28] text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                <div className="pt-3 border-t border-[#D8D4CC] flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                                                    {project.github ? (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-mono text-[11px] text-[#6B6861] hover:text-[#151515] transition-colors flex items-center gap-1"
                                                        >
                                                            <Github size={12} /> Source
                                                        </a>
                                                    ) : (
                                                        <span />
                                                    )}

                                                    {project.deploy ? (
                                                        <a
                                                            href={project.deploy}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-mono text-[11px] text-[#151515] hover:text-[#FF4F2B] font-bold flex items-center gap-1 transition-colors"
                                                        >
                                                            <span>Launch</span>
                                                            <ArrowUpRight size={12} />
                                                        </a>
                                                    ) : (
                                                        <button
                                                            onClick={() => setSelectedProject(project)}
                                                            className="font-mono text-[11px] text-[#6B6861] hover:text-[#151515] font-semibold"
                                                        >
                                                            Specs →
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Technical Specifications Modal */}
                {selectedProject && (
                    <ProjectSpecsModal
                        project={selectedProject}
                        isOpen={!!selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </section>
        </ClickSpark>
    );
}
