import React from "react";
import "../../styles/marque.css";

const messages = [
  "Celebrate Innovation 🚀",
  "Learn. Build. Compete. 💡",
  "Join IEEE Day 2025 🎉",
  "Showcase Your Talent ✨",
  "Collaborate & Create 🤝",
  "Shape the Future with Tech 🌍",
  "Unleash Your Potential 🔥"
];

export default function Marquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee">
        {messages.map((msg, i) => (
          <span key={i} className="marquee-text">
            {msg}
          </span>
        ))}
        {messages.map((msg, i) => (
          <span key={`dup-${i}`} className="marquee-text">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};