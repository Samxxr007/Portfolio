import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send, Github, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = useState("idle"); // idle, sending, success, error
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("https://formspree.io/f/mzdjdker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                // Reset status after 5 seconds to show form again or just keep success
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="story-chapter story-chapter--contact">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-left mb-12 chapter-head contact-heading"
                >
                    <h4
                        className="chapter-kicker text-sm font-bold tracking-[0.2em] uppercase mb-4 opacity-70"
                        style={{ color: "var(--color-accent)" }}
                    >
                        Get In Touch
                    </h4>
                    <h2 className="chapter-heading contact-title text-4xl md:text-5xl font-bold text-white mb-6 italic font-serif">
                        Let's Work <span style={{ color: "var(--color-accent)" }}>Together</span>
                    </h2>
                    <p className="chapter-intro text-slate-400 max-w-2xl text-lg leading-relaxed">
                        Have a project in mind or just want to chat? Feel free to reach out, and I'll get back to you as soon as possible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Info Cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="space-y-6"
                    >
                        <ContactInfoCard
                            icon={<Mail size={24} />}
                            label="Email"
                            value="sameerahmedg666@gmail.com"
                            link="mailto:sameerahmedg666@gmail.com"
                        />
                        <ContactInfoCard
                            icon={<Phone size={24} />}
                            label="Phone"
                            value="Available on Request"
                            link="mailto:sameerahmedg666@gmail.com?subject=Phone Number Request"
                        />
                        <ContactInfoCard
                            icon={<MapPin size={24} />}
                            label="Location"
                            value="Chennai, India"
                            link="#"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <SocialCard
                                icon={<Linkedin size={24} />}
                                label="LinkedIn"
                                value="Sameer Ahmed G"
                                link="https://linkedin.com/in/Sameer2007"
                            />
                            <SocialCard
                                icon={<Github size={24} />}
                                label="GitHub"
                                value="Samxxr007"
                                link="https://github.com/Samxxr007"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-10 rounded-3xl border border-slate-800/60 bg-slate-900/40 relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-6 border border-emerald-500/20">
                                        <CheckCircle2 size={64} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-slate-400 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-8 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : status === "error" ? (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 mb-6 border border-rose-500/20">
                                        <AlertCircle size={64} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Submission Error</h3>
                                    <p className="text-slate-400 text-sm">Something went wrong. Please try again or email me directly.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-8 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        Try Again
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Sameer Ahmed"
                                                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent)]/20 transition-all text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Your Email</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="example@gmail.com"
                                                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent)]/20 transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Subject</label>
                                        <input
                                            required
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Inquiry about project or role"
                                            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent)]/20 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Your Message</label>
                                        <textarea
                                            required
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Write your message here..."
                                            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent)]/20 transition-all resize-none text-sm"
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={status === "sending"}
                                        type="submit"
                                        className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:brightness-110 shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent)_30%,transparent)] disabled:opacity-70 disabled:cursor-not-allowed group text-sm"
                                        style={{
                                            backgroundColor: "var(--color-accent)",
                                            color: "#020617"
                                        }}
                                    >
                                        {status === "sending" ? (
                                            <>
                                                Sending Message...
                                                <Loader2 size={18} className="animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <p className="text-[10px] text-center text-slate-500 font-medium">
                                        * Form powered by Formspree. Your data is handled securely.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ContactInfoCard({ icon, label, value, link }) {
    return (
        <motion.a
            href={link}
            variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ x: 5 }}
            className="glass-card p-4 sm:p-6 rounded-2xl border border-slate-800/60 bg-slate-900/40 flex items-center gap-4 sm:gap-6 group transition-all min-w-0 overflow-hidden"
        >
            <div
                className="p-3.5 sm:p-4 rounded-xl bg-slate-950 shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0"
                style={{ color: "var(--color-accent)" }}
            >
                {icon}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-[color:var(--color-accent)] transition-colors truncate break-all">
                    {value}
                </p>
            </div>
        </motion.a>
    );
}

function SocialCard({ icon, label, value, link }) {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer me"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5 }}
            className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800/60 bg-slate-900/40 flex flex-col items-center text-center group transition-all min-w-0 overflow-hidden"
        >
            <div
                className="mb-3 p-3 rounded-xl bg-slate-950 shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0"
                style={{ color: "var(--color-accent)" }}
            >
                {icon}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
            <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[color:var(--color-accent)] transition-colors truncate w-full">{value}</p>
        </motion.a>
    );
}
