import { ArrowDownRight } from "lucide-react";

const focusAreas = [
  { number: "01", title: "Product interfaces", text: "Responsive web and mobile experiences with attention to detail." },
  { number: "02", title: "Reliable systems", text: "APIs, data models, and backend services built to do real work." },
  { number: "03", title: "Applied intelligence", text: "Computer vision and data-driven features with a practical purpose." },
];

export default function About() {
  return (
    <section id="about" className="story-chapter story-chapter--about">
      <div className="chapter-shell about-layout">
        <aside className="chapter-rail" aria-label="Chapter information">
          <span>CHAPTER 01</span>
          <span>THE BUILDER</span>
          <span className="chapter-rail__number">01</span>
          <span className="chapter-rail__bottom">PROFILE / 2026</span>
        </aside>

        <div className="about-content">
          <p className="chapter-kicker">A developer who thinks beyond the screen</p>
          <h2 className="chapter-heading about-heading">
            I BUILD THINGS THAT <em>MATTER.</em>
          </h2>
          <p className="chapter-intro about-intro">
            I’m a software engineer and third-year student at SIMATS, interested in the space where
            considered interfaces meet dependable engineering.
          </p>

          <div className="about-bottom">
            <div className="about-statement">
              <span className="chapter-label">THE APPROACH</span>
              <p>
                From React Native experiences and full-stack products to backend services and
                computer-vision experiments, I enjoy turning complex problems into tools people
                can actually use.
              </p>
              <a href="#experience" className="chapter-text-link">
                Follow the journey <ArrowDownRight size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="about-focus-list">
              <span className="chapter-label">WHAT I WORK ON</span>
              {focusAreas.map((item) => (
                <div className="about-focus-row chapter-row" key={item.number}>
                  <span className="about-focus-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
