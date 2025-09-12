import { useEffect, useRef, useState } from "react";
import "../../styles/timeline.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesText } from "../modern-ui/sparkles-text";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const [activeDay, setActiveDay] = useState(1);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = gsap.utils.toArray(".timeline-item");
    const trail = timelineRef.current.querySelector(".timeline-trail");

    gsap.fromTo(
      trail,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [activeDay]);

  const timelines = {
    1: [
      { title: "Kick-off", desc: "Welcome speech and event inauguration." },
      { title: "Icebreaker", desc: "Fun games and team activities." },
      { title: "Kick-off", desc: "Welcome speech and event inauguration." },
      { title: "Icebreaker", desc: "Fun games and team activities." },
      { title: "Kick-off", desc: "Welcome speech and event inauguration." },
      { title: "Icebreaker", desc: "Fun games and team activities." },
    ],
    2: [
      { title: "Workshops", desc: "Engaging technical sessions to build and learn." },
      { title: "Hackathon Begins", desc: "Start coding and innovating." },
    ],
    3: [
      { title: "Competitions", desc: "Fun and challenging contests for all participants." },
      { title: "Tech Talks", desc: "Sessions from industry experts." },
    ],
    4: [
      { title: "Project Showcase", desc: "Teams present their projects." },
      { title: "Closing Ceremony", desc: "Final announcements and winner felicitation." },
    ],
  };

  return (
    <div id="timeline">
      <center>
        <div
          className="sparkles-wrap animate"
          style={{ animationDelay: "0.38s" }}
        >
          <SparklesText
            text="Timeline"
            sparkleCount={10}
            sparkleSize={18}
            speed={0.3}
            sparkleColors={["#FFD700", "#FF69B4", "#7b2dd1"]}
            className="text-5xl font-extrabold hero-sparkles timeline-heading"
          />
        </div>
      </center>

      {/* Toggle Buttons */}
      <div className="toggleButtons">
        {[1, 2, 3, 4].map((day) => (
          <button
            key={day}
            className={`toggleBtn ${activeDay === day ? "active" : ""}`}
            onClick={() => setActiveDay(day)}
          >
            Day {day}
          </button>
        ))}
      </div>

      {/* Timeline for selected day */}
      <div className="timeline-container" ref={timelineRef}>
        <div className="timeline-trail"></div>
        {timelines[activeDay].map((event, i) => (
          <div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
