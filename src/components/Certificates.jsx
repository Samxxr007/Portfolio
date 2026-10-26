import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, CheckCircle2, ExternalLink } from "lucide-react";

import nvidiaImg from "../assets/certificates/nvidia.jpg";
import googleCloudImg from "../assets/certificates/google-cloud.png";
import ibmImg from "../assets/certificates/ibm.png";
import bcgxImg from "../assets/certificates/bcg-x.jpg";
import nptelImg from "../assets/certificates/nptel.jpg";
import corizoInternImg from "../assets/certificates/corizo-internship.jpg";
import corizoTrainImg from "../assets/certificates/corizo-training.jpg";

const certificates = [
    { title: "AI for All: From Basics to GenAI Practice", issuer: "NVIDIA Academy", date: "November 2025", image: nvidiaImg, verified: true },
    { title: "Introduction to Generative AI", issuer: "Google Cloud / Simplilearn", date: "November 2025", image: googleCloudImg, verified: true },
    { title: "AI Literacy", issuer: "IBM SkillsBuild", date: "November 2025", image: ibmImg, verified: true },
    { title: "GenAI Job Simulation", issuer: "BCG X (Forage)", date: "November 2025", image: bcgxImg, verified: true },
    { title: "Introduction to Internet of Things", issuer: "NPTEL (IIT Kharagpur)", date: "October 2025", image: nptelImg, verified: true, score: "77% / Elite" },
    { title: "Web Development Internship", issuer: "Mood Indigo (IIT-B) / Corizo", date: "July 2025", image: corizoInternImg, verified: true },
    { title: "Web Development Training", issuer: "Corizo", date: "July 2025", image: corizoTrainImg, verified: true, credentialUrl: "https://credentials.corizo.in/credential/a13bc29d-3986-448b-a461-6b773f18b772" },
];

export default function Certificates() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = certificates[activeIndex];

    return (
        <section id="certificates" className="story-chapter story-chapter--certificates">
            <div className="chapter-shell credential-exhibit">
                <div className="credential-heading">
                    <div>
                        <p className="chapter-kicker">CHAPTER 05 / THE RECORD</p>
                        <h2 className="chapter-heading credential-title">PROOF, NOT<br /><em>PROMISES.</em></h2>
                    </div>
                    <div className="credential-count">
                        <strong>{String(certificates.length).padStart(2, "0")}</strong>
                        <span>DOCUMENTS<br />ON RECORD</span>
                    </div>
                </div>

                <div className="credential-layout">
                    <div className="credential-stage">
                        <div className="credential-stage__topline">
                            <span><Award size={14} aria-hidden="true" /> CREDENTIAL VIEWER</span>
                            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}</span>
                        </div>

                        <div className="credential-paper">
                            <AnimatePresence mode="wait">
                                <Motion.img
                                    key={active.image}
                                    src={active.image}
                                    alt={`${active.title} certificate from ${active.issuer}`}
                                    className="credential-paper__image"
                                    initial={{ opacity: 0, y: 12, scale: 0.985 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.99 }}
                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                />
                            </AnimatePresence>
                            <div className="credential-paper__corner" aria-hidden="true">S / ARCHIVE</div>
                        </div>

                        <div className="credential-active-details">
                            <div className="credential-active-details__meta">
                                <span>{active.date}</span>
                                {active.score && <span className="credential-score">{active.score}</span>}
                            </div>
                            <h3>{active.title}</h3>
                            <div className="credential-active-details__bottom">
                                <span>{active.issuer}</span>
                                {active.verified && <span className="credential-verified"><CheckCircle2 size={14} aria-hidden="true" /> VERIFIED RECORD</span>}
                            </div>
                            {active.credentialUrl && (
                                <a href={active.credentialUrl} target="_blank" rel="noopener noreferrer" className="credential-open-link">
                                    Open credential <ArrowUpRight size={15} aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="credential-index">
                        <div className="credential-index__heading">
                            <span className="chapter-label">THE INDEX</span>
                            <p>Select a record to inspect it.</p>
                        </div>
                        <div className="credential-index__list">
                            {certificates.map((certificate, index) => (
                                <button
                                    type="button"
                                    key={certificate.title}
                                    className={`credential-index-item ${activeIndex === index ? "is-active" : ""}`}
                                    onClick={() => setActiveIndex(index)}
                                    aria-current={activeIndex === index ? "true" : undefined}
                                >
                                    <span className="credential-index-item__number">{String(index + 1).padStart(2, "0")}</span>
                                    <span className="credential-index-item__copy">
                                        <strong>{certificate.title}</strong>
                                        <small>{certificate.issuer}</small>
                                    </span>
                                    <span className="credential-index-item__arrow"><ArrowUpRight size={16} aria-hidden="true" /></span>
                                </button>
                            ))}
                        </div>
                        <div className="credential-index__footer">
                            <span>LEARNING / PRACTICE / DELIVERY</span>
                            <span>2025—2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
