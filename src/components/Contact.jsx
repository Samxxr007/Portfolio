import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowDownRight, ArrowUpRight, CheckCircle2, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = useState("idle");
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const handleChange = (event) => {
        setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("https://formspree.io/f/mzdjdker", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Unable to submit the message.");
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            window.setTimeout(() => setStatus("idle"), 6000);
        } catch (error) {
            console.error("Contact form submission failed:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="story-chapter story-chapter--contact">
            <div className="chapter-shell contact-finale">
                <div className="contact-finale__eyebrow">
                    <span>CHAPTER 06 / THE NEXT THING</span>
                    <span className="contact-finale__availability"><i /> OPEN TO GOOD PROBLEMS</span>
                </div>

                <div className="contact-finale__hero">
                    <div className="contact-finale__headline">
                        <p className="chapter-kicker">HAVE AN AMBITIOUS IDEA?</p>
                        <h2 className="chapter-heading contact-title">
                            LET'S MAKE<br />
                            <span className="contact-outline-word">IT</span> <em>REAL.</em>
                        </h2>
                        <p className="contact-finale__thought">
                            Good work starts with a conversation. Bring the messy brief, the half-formed idea,
                            or the hard problem. We can shape the next step together.
                        </p>
                        <a className="contact-finale__email" href="mailto:sameerahmedg666@gmail.com">
                            <span>sameerahmedg666@gmail.com</span>
                            <ArrowUpRight size={20} aria-hidden="true" />
                        </a>
                    </div>

                    <div className="contact-finale__orbit" aria-hidden="true">
                        <div className="contact-finale__orbit-ring contact-finale__orbit-ring--one" />
                        <div className="contact-finale__orbit-ring contact-finale__orbit-ring--two" />
                        <div className="contact-finale__orbit-center">
                            <span>IDEA</span>
                            <b>↗</b>
                            <span>IN MOTION</span>
                        </div>
                        <span className="contact-finale__orbit-node contact-finale__orbit-node--one" />
                        <span className="contact-finale__orbit-node contact-finale__orbit-node--two" />
                    </div>
                </div>

                <div className="contact-finale__bottom">
                    <div className="contact-finale__channels">
                        <div className="contact-finale__section-label">
                            <span className="chapter-label">FIND ME OUT THERE</span>
                            <p>Pick the channel that works for you.</p>
                        </div>
                        <a href="https://github.com/Samxxr007" target="_blank" rel="noopener noreferrer" className="contact-channel">
                            <span className="contact-channel__icon"><Github size={18} aria-hidden="true" /></span>
                            <span><small>CODE / BUILDS</small><strong>GitHub</strong></span>
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                        <a href="https://www.linkedin.com/in/sameer2007" target="_blank" rel="noopener noreferrer" className="contact-channel">
                            <span className="contact-channel__icon"><Linkedin size={18} aria-hidden="true" /></span>
                            <span><small>WORK / NETWORK</small><strong>LinkedIn</strong></span>
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                        <div className="contact-finale__location"><span>BASED IN</span><strong>Chennai, India</strong></div>
                    </div>

                    <div className="contact-finale__form-wrap">
                        <div className="contact-finale__form-heading">
                            <span className="chapter-label">OR WRITE A NOTE</span>
                            <span>FORM / 001</span>
                        </div>
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <Motion.div key="success" className="contact-form-state" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                    <CheckCircle2 size={32} aria-hidden="true" />
                                    <h3>Message sent.</h3>
                                    <p>Thanks for starting the conversation. I'll get back to you soon.</p>
                                    <button type="button" onClick={() => setStatus("idle")}>Send another note <ArrowDownRight size={15} /></button>
                                </Motion.div>
                            ) : status === "error" ? (
                                <Motion.div key="error" className="contact-form-state contact-form-state--error" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                    <AlertCircle size={32} aria-hidden="true" />
                                    <h3>That didn't go through.</h3>
                                    <p>Try once more, or email me directly using the address above.</p>
                                    <button type="button" onClick={() => setStatus("idle")}>Back to form <ArrowDownRight size={15} /></button>
                                </Motion.div>
                            ) : (
                                <Motion.form key="form" className="contact-note-form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="contact-note-form__row">
                                        <label>
                                            <span>01 / YOUR NAME</span>
                                            <input required name="name" value={formData.name} onChange={handleChange} placeholder="What should I call you?" autoComplete="name" />
                                        </label>
                                        <label>
                                            <span>02 / EMAIL</span>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" autoComplete="email" />
                                        </label>
                                    </div>
                                    <label>
                                        <span>03 / WHAT'S THIS ABOUT?</span>
                                        <input required name="subject" value={formData.subject} onChange={handleChange} placeholder="A project, a role, an idea..." />
                                    </label>
                                    <label>
                                        <span>04 / THE DETAILS</span>
                                        <textarea required name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Give me the interesting version." />
                                    </label>
                                    <button className="contact-note-form__submit" type="submit" disabled={status === "sending"}>
                                        <span>{status === "sending" ? "SENDING YOUR NOTE" : "SEND THE NOTE"}</span>
                                        {status === "sending" ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} aria-hidden="true" />}
                                    </button>
                                    <p className="contact-note-form__fineprint"><Mail size={12} aria-hidden="true" /> Delivered through Formspree. Direct email is always available too.</p>
                                </Motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <footer className="contact-finale__footer">
                    <a href="#home" className="contact-finale__signature">SAMEER AHMED G<span>.</span></a>
                    <span>BUILD WITH CURIOSITY. SHIP WITH CARE.</span>
                    <a href="#home" className="contact-finale__backtop">BACK TO TOP ↑</a>
                </footer>
            </div>
        </section>
    );
}
