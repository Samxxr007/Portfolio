import { useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronDown, ChevronUp, Github, ScanEye } from "lucide-react";
import ProjectSpecsModal from "./ProjectSpecsModal";
import { projects, categories } from "../data/projects";

export default function Projects() {
    const [activeTab, setActiveTab] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    const featuredProjects = projects.filter((project) => project.featured);
    const archiveProjects = projects.filter((project) => !project.featured);
    const filteredProjects = activeTab === "All"
        ? archiveProjects
        : archiveProjects.filter((project) => project.category === activeTab);

    return (
        <section id="projects" className="story-chapter story-chapter--projects">
            <div className="chapter-shell projects-shell">
                <div className="projects-heading chapter-head">
                    <div>
                        <p className="chapter-kicker">CHAPTER 04 / SELECTED WORK</p>
                        <h2 className="chapter-heading">BUILT TO<br /><em>DO SOMETHING.</em></h2>
                    </div>
                    <div className="projects-heading-side">
                        <span className="projects-count">{String(featuredProjects.length).padStart(2, "0")}</span>
                        <p className="chapter-intro">Selected systems, experiments, and shipped ideas. Each one starts with a problem worth solving.</p>
                    </div>
                </div>

                <div className="project-feature-list">
                    {featuredProjects.map((project, index) => (
                        <article className="project-feature-row chapter-row" key={project.id}>
                            <div className="project-feature-index">
                                <span>0{index + 1}</span>
                                <span className="project-feature-index-line" />
                            </div>
                            <div className="project-feature-body">
                                <div className="project-feature-meta">
                                    <span>{project.category}</span>
                                    <span>{project.status}</span>
                                </div>
                                <h3>{project.title}<span className="project-period">.</span></h3>
                                <p className="project-feature-description">{project.description}</p>
                                <div className="project-feature-tags">
                                    {project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
                                </div>
                            </div>
                            <div className="project-feature-side">
                                <span className="project-feature-metric">{project.metric}</span>
                                <button className="project-detail-link" type="button" onClick={() => setSelectedProject(project)}>
                                    <ScanEye size={15} aria-hidden="true" /> Technical notes
                                </button>
                                <div className="project-feature-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>
                                            <Github size={16} aria-hidden="true" /> Source
                                        </a>
                                    )}
                                    {project.deploy && (
                                        <a href={project.deploy} target="_blank" rel="noopener noreferrer">
                                            Live build <ArrowUpRight size={15} aria-hidden="true" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="project-archive">
                    <div className="project-archive-intro">
                        <div>
                            <span className="chapter-label">THE EXTENDED INDEX</span>
                            <h3>More experiments. More systems.</h3>
                        </div>
                        <button className="project-archive-toggle" type="button" onClick={() => setIsArchiveOpen(!isArchiveOpen)} aria-expanded={isArchiveOpen}>
                            {isArchiveOpen ? "Close archive" : `Open archive · ${archiveProjects.length}`}
                            {isArchiveOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>

                    <AnimatePresence initial={false}>
                        {isArchiveOpen && (
                            <Motion.div
                                className="project-archive-content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="project-archive-filters" aria-label="Filter projects by category">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            className={activeTab === category ? "is-active" : ""}
                                            type="button"
                                            onClick={() => setActiveTab(category)}
                                        >
                                            {category}
                                            <span>{category === "All" ? archiveProjects.length : archiveProjects.filter((project) => project.category === category).length}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="project-archive-list">
                                    {filteredProjects.map((project, index) => (
                                        <button className="project-archive-row" key={project.id || project.title} type="button" onClick={() => setSelectedProject(project)}>
                                            <span>{String(index + 1).padStart(2, "0")}</span>
                                            <span className="project-archive-title">{project.title}</span>
                                            <span className="project-archive-category">{project.category}</span>
                                            <span className="project-archive-metric">{project.metric}</span>
                                            <ArrowUpRight size={16} aria-hidden="true" />
                                        </button>
                                    ))}
                                </div>
                            </Motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="projects-endline">
                    <span>END OF INDEX</span>
                    <a href="#contact">Have a problem to solve? <ArrowDownRight size={15} aria-hidden="true" /></a>
                </div>
            </div>

            {selectedProject && (
                <ProjectSpecsModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
}
