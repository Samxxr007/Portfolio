import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

const experiences = [
    {
        id: "truck-hai",
        role: "React Native Developer",
        type: "Active Internship",
        company: "Truck Hai",
        subline: "Logistics & Freight Mobility",
        location: "India · Remote",
        period: "Jul 2026 - Present",
        isCurrent: true,
        icon: Briefcase,
        points: [
            { label: "Cross-Platform Mobile Engineering", desc: "Architected and built core screens for the Truck Hai driver & fleet app using React Native, Expo, TypeScript, and Go." },
            { label: "Backend & Microservices", desc: "Contributed to high-throughput backend services in Go, integrating REST APIs with optimized payload latency." },
            { label: "Relational Database Testing", desc: "Engineered PostgreSQL schemas, queries, and migrations for local development workflows and integration test suites." },
            { label: "Team Velocity & Quality", desc: "Managed pull requests, peer code reviews, and followed weekly Agile sprints to rapidly ship driver dispatch and tracking features." }
        ],
        skills: ["React Native", "Expo", "TypeScript", "Go (Golang)", "PostgreSQL", "REST APIs", "Agile Sprint"]
    },
    {
        id: "skybrisk",
        role: "Web Developer Intern",
        type: "Enterprise ERP",
        company: "The Skybrisk",
        subline: "Enterprise Business Systems",
        location: "Remote",
        period: "Feb 2026 - Apr 2026",
        isCurrent: false,
        icon: Briefcase,
        points: [
            { label: "Enterprise ERP Architecture", desc: "Developed and deployed a production-grade ERP web platform using MERN Stack and Material-UI." },
            { label: "RBAC Security", desc: "Built a multi-tier Role-Based Access Control authorization engine, securing sensitive administrative and client records." },
            { label: "Workflow Optimization", desc: "Streamlined data entry workflows, reducing operational friction across inventory, invoicing, and order pipelines." }
        ],
        skills: ["React", "Node.js", "Express", "MongoDB", "Material-UI", "RBAC Engine", "JWT"]
    },
    {
        id: "rmkart",
        role: "Full Stack Intern",
        type: "E-Commerce Platform",
        company: "RMkart",
        subline: "ShopSphere Platform",
        location: "Remote",
        period: "Feb 2026 - Mar 2026",
        isCurrent: false,
        icon: Briefcase,
        points: [
            { label: "BFF Pattern Transition", desc: "Transitioned monolithic e-commerce endpoints to a decoupled Backend-for-Frontend (BFF) architecture, improving mobile responsiveness." },
            { label: "Authentication & Security", desc: "Implemented JWT token rotation and secure session management across buyer and seller portals." },
            { label: "Scalable React/Vite UI", desc: "Designed interactive product catalogs and lightning-fast checkout experiences." }
        ],
        skills: ["React", "Node.js", "BFF Pattern", "JWT Rotation", "Vite", "Tailwind CSS"]
    },
    {
        id: "corizo",
        role: "Full Stack Web Development Intern",
        type: "Engineering Training",
        company: "Corizo Edutech Pvt. Ltd.",
        subline: "Edutech Solutions",
        location: "Remote",
        period: "Jun 2025 - Aug 2025",
        isCurrent: false,
        icon: Briefcase,
        points: [
            { label: "Hands-On Full Stack Training", desc: "Completed intensive 2-month engineering projects mastering modern web fundamentals, REST API conventions, and frontend state." },
            { label: "Code Quality", desc: "Adhered to industry coding standards, participating in mentor-guided code reviews and agile sprints." }
        ],
        skills: ["Full Stack Web", "JavaScript ES6+", "HTML5/CSS3", "REST APIs", "Git/GitHub"]
    },
    {
        id: "education",
        role: "B.Tech in Information Technology",
        type: "3rd Year Undergraduate",
        company: "SIMATS University",
        subline: "School of Engineering",
        location: "Chennai, Tamil Nadu",
        period: "2024 - Present",
        isEducation: true,
        icon: GraduationCap,
        cgpa: "9.35",
        points: [
            { label: "Academic Standing", desc: "Currently in 3rd Year (Pre-Final Year) with a 9.35 CGPA, focusing on Distributed Systems, Cloud Architecture, and Machine Learning." },
            { label: "Core Coursework", desc: "Data Structures & Algorithms, Database Management Systems (PostgreSQL), Computer Networks, and Software Engineering Principles." }
        ],
        skills: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering"]
    }
];

export default function Experience() {
    return (
        <section id="experience" className="story-chapter story-chapter--experience">
            <div className="chapter-shell experience-shell">
                <div className="experience-heading chapter-head">
                    <div>
                        <p className="chapter-kicker">CHAPTER 03 / THE FIELD NOTES</p>
                        <h2 className="chapter-heading">LEARN BY<br /><em>SHIPPING.</em></h2>
                    </div>
                    <p className="chapter-intro">
                        Real teams, real constraints, and the work of taking software from idea to release.
                    </p>
                </div>

                <div className="experience-list">
                    {experiences.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article className="experience-entry chapter-row" key={item.id}>
                                <div className="experience-entry-rail">
                                    <span className="experience-entry-number">0{index + 1}</span>
                                    <span className="experience-entry-period">{item.period}</span>
                                    <span className={item.isCurrent ? "experience-entry-status is-current" : "experience-entry-status"}>
                                        {item.isCurrent ? "CURRENT" : item.type}
                                    </span>
                                </div>

                                <div className="experience-entry-main">
                                    <div className="experience-entry-top">
                                        <div className="experience-entry-company">
                                            <span className="experience-entry-icon"><Icon size={17} aria-hidden="true" /></span>
                                            <span>{item.company} <small>/ {item.subline}</small></span>
                                        </div>
                                        <span className="experience-entry-location">{item.location}</span>
                                    </div>

                                    <h3>{item.role}</h3>
                                    <div className="experience-entry-points">
                                        {item.points.map((point, pointIndex) => (
                                            <p key={point.label || pointIndex}>
                                                <strong>{point.label}.</strong> {point.desc}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="experience-entry-skills">
                                        {item.skills.map((skill) => <span key={skill}>{skill}</span>)}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="experience-endnote">
                    <span>FIELD NOTES</span>
                    <span>BUILD · TEST · SHIP · LEARN</span>
                </div>
            </div>
        </section>
    );
}
