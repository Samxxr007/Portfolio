import { motion } from "framer-motion";
import { Code2, Layout, Database, Terminal, Cpu, Globe } from "lucide-react";

const skillGroups = [
    {
        title: "Mobile & Frontend",
        icon: <Layout size={24} />,
        skills: ["React Native", "Expo", "React 19", "Next.js 14", "TypeScript", "Tailwind CSS"]
    },
    {
        title: "Backend & Cloud",
        icon: <Database size={24} />,
        skills: ["Go (Golang)", "Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Prisma"]
    },
    {
        title: "AI & Computer Vision",
        icon: <Cpu size={24} />,
        skills: ["YOLOv11", "OpenCV", "Scikit-Learn", "REST APIs", "BFF Patterns"]
    },
    {
        title: "DevOps & Tooling",
        icon: <Terminal size={24} />,
        skills: ["Docker", "CI/CD", "GitHub Actions", "Git", "Vercel", "Render"]
    },
    {
        title: "Core Languages",
        icon: <Code2 size={24} />,
        skills: ["TypeScript", "JavaScript", "Go", "Python", "Java", "C/C++"]
    },
    {
        title: "UI/UX & Interactive",
        icon: <Globe size={24} />,
        skills: ["Framer Motion", "Material-UI", "Recharts", "Leaflet GIS", "Responsive UI"]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function TechStack() {
    const allSkills = skillGroups.flatMap((group) => group.skills);
    return (
        <section id="skills" className="story-chapter story-chapter--skills">
            <div className="chapter-shell skills-shell">
                <div className="skills-heading chapter-head">
                    <div>
                        <p className="chapter-kicker">CHAPTER 02 / THE TOOLKIT</p>
                        <h2 className="chapter-heading">TOOLS FOR<br /><em>MAKING IDEAS REAL.</em></h2>
                    </div>
                    <p className="chapter-intro">
                        A flexible toolkit across product interfaces, backend infrastructure, and applied AI.
                        I choose the stack around the problem—not the other way around.
                    </p>
                </div>

                <div className="skills-index">
                    {skillGroups.map((group, index) => (
                        <div className="skills-index-row chapter-row" key={group.title}>
                            <span className="skills-index-number">0{index + 1}</span>
                            <div className="skills-index-category">
                                <span className="skills-index-icon">{group.icon}</span>
                                <h3>{group.title}</h3>
                            </div>
                            <div className="skills-index-list">
                                {group.skills.map((skill) => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="skills-marquee" aria-label="Technologies used">
                    <div className="skills-marquee-track">
                        {[0, 1].map((copy) => (
                            <span className="skills-marquee-set" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
                                {allSkills.map((skill, index) => (
                                    <span key={skill + index}>{skill}<b> / </b></span>
                                ))}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
