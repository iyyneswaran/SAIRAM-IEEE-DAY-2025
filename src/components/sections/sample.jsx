import React, { useMemo, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesText } from "../modern-ui/sparkles-text";
import "../../styles/sample.css";

// Event images
import quirkytank from "../../assets/events-img/quirky_tank.jpg";
import cryticx from '../../assets/events-img/cryticX.jpg';
import yaaplikkanam from '../../assets/events-img/yaapilakkanam.jpg';
import circuitCraze from '../../assets/events-img/circuit_craze.jpg';
import hacktales from '../../assets/events-img/hack_tales.jpg';
import viralLolgorithms from '../../assets/events-img/viral_lolgorithms.jpg';
import promptopia from '../../assets/events-img/promptopia.jpg';
import reverzion from '../../assets/events-img/reversee.jpg';
import pwnage_party from '../../assets/events-img/pwnage_party.jpg';
import soon from '../../assets/events-img/comingsoon.jpg';

// Coordinator images (you already had these)
import Vikrambose from "../../assets/coordinators/bose.jpg";
import shivani from "../../assets/coordinators/SHIVANI png.png";
import trivikraman from "../../assets/coordinators/Trivikraman.jpg";
import Gengaraj from "../../assets/coordinators/Gengaraj P - Present - Influencer_.jpg";
import iyyneswaran from "../../assets/coordinators/iyynes.jpg";
import vishali from "../../assets/coordinators/vishali.jpg";
import annapoorani from '../../assets/coordinators/annapoorani.jpg';
import nataraj from '../../assets/coordinators/Nataraj EL_Vice Chair_Elect.jpg';
import pavithran from '../../assets/coordinators/PAVITHRAN M - Present Secretary.jpg';
import tejashree from '../../assets/coordinators/Tejashree M J_Secretary_Elect.jpg';
import srinidhi from '../../assets/coordinators/SRINIDHI T - MAIN ( SECRETARY ).jpg';
import lingesh from '../../assets/coordinators/LINGESH PT -Elect Communicator.jpg';
import balamurugan from '../../assets/coordinators/Balamurugan.jpg';
import ajitha_anadhi from '../../assets/coordinators/ajithaanadhi.jpg';
import sriram from '../../assets/coordinators/sriram.jpg';
import parveenbegum from '../../assets/coordinators/parveenbegum.jpg';
import sreelaya from '../../assets/coordinators/sreelaya.jpg';
import sanjays from '../../assets/coordinators/SANJAY S(ELECTED CHAIRPERSON).png';
import srinateesh from "../../assets/coordinators/SRINATHEESH S .png";

import { RiLinkedinBoxFill, RiPhoneFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";

gsap.registerPlugin(ScrollTrigger);

export default function Samplepage() {
  const [selectedType, setSelectedType] = useState("events");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsRef = useRef(null);
  const workshopRef = useRef(null);
  const headerRef = useRef(null);

  const technicalEvents = useMemo(
    () => [
      {
        title: "Yaapilakkanam",
        dateTime: "18 Sep, 11:00 AM",
        teamSize: "3-4 Members",
        image: yaaplikkanam,
        category: "tech",
        coordinators: [
          { name: "Srinatheesh S", role: "Secretary", img: srinateesh, socials: { linkedin: "https://www.linkedin.com/in/srinatheesh-s-b609b8264", phone: "9677151449" } },
          { name: "Sri Raman M", role: "Coordinator", img: sriram, socials: { linkedin: "https://www.linkedin.com/in/sri-raman-m-321505253/", phone: "9940527926" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSd-ytlrPwlYhC1nqJRppD61alu1CT3px4bYBLbTeXJt9qKZug/viewform?usp=header",
        rounds: [
          { title: "", desc: "Step into Yaapilakkanam, a high-energy competition that blends strategy, creativity, and real-world impact. The challenge kicks off with a quick-fire Q&A to spot sharp minds, followed by Budget Framing where shuffled teams craft innovative yet practical budgets around chosen problem statements. The finale raises the stakes with rural development scenarios, pushing participants to design impactful plans and present workable solutions under pressure." },
        ],
        rules: [
          "Stick to the time limits for each round.",
          "Budgets should be clear, realistic, and well-justified.",
          "Teamwork and presentation skills will play a key role.",
          "Judges’ decisions will be final and binding."
        ]
      },
      // other events data comes here and i have that
    ],
    []
  );

  const workshopEvents = useMemo(
    () => [
      {
        title: "Tech Leadership Conclave",
        dateTime: "09:30 AM – 03:50 PM (Date: Will be announced)",
        teamSize: "Individual / Pitch Competition: Teams of 3",
        image: soon,
        category: "workshop",
        guest: {
          name: "Ramdhan MP",
          title: "Founder / CEO of Artyland",
          img: Vikrambose, // fallback image from your assets
          socials: { instagram: "https://www.instagram.com/ramdhan.mpr/" }
        },
        theme: "Panel discussion + workshops around tech leadership, project management, and entrepreneurship.",
        objectives: [
          "Understand core principles of tech leadership and project management.",
          "Know IEEE standards and how they inform technical leadership.",
          "Gain entrepreneurship insights and practical next steps to start.",
          "Participate in a hands-on on-spot pitch competition to apply learnings."
        ],
        targetParticipants: [
          "Engineering, Science and Technology Students (UG/PG) and MBA.",
          "Research Scholars & Innovators.",
          "Aspiring / Budding Entrepreneurs."
        ],
        sampleSchedule: [
          { time: "09:30 AM - 09:50 AM", activity: "On-spot registrations — First 90 seats reserved for pre-registrations" },
          { time: "10:00 AM - 11:05 AM", activity: "Tech Leadership Talk (Keynote by Ramdhan MP + insights)" },
          { time: "11:05 AM - 11:15 AM", activity: "Hi Tea / Networking" },
          { time: "11:15 AM - 12:35 PM", activity: "Entrepreneurship Insights — Panel discussion + Student interaction" },
          { time: "12:35 PM - 01:40 PM", activity: "Lunch Break" },
          { time: "01:40 PM - 03:30 PM", activity: "On-spot Pitch Team Competition" },
          { time: "03:30 PM - 03:50 PM", activity: "Wrap-up & Announcements" }
        ],
        pitchDetails: {
          description: "On-Spot Pitch Team Competition — teams will have limited time to ideate and present a minimal go-to-market plan. Judges will evaluate feasibility, innovation, team communication, and scalability.",
          teamRules: [
            "Teams of up to 3 members.",
            "Pitch time: 3 minutes + 2 minutes Q&A.",
            "Use of slides OK (USB or mobile). Keep it concise."
          ],
          judgingCriteria: [
            "Problem clarity & market understanding",
            "Feasibility & technical soundness",
            "Business potential & impact",
            "Presentation & Q/A handling"
          ]
        },
        coordinators: [
          { name: "Trivikraman", role: "Coordinator", img: trivikraman, socials: { linkedin: "https://linkedin.com/in/trivikraman", phone: "9999999999" } },
          { name: "Vikram Bose", role: "Coordinator", img: Vikrambose, socials: { linkedin: "https://linkedin.com/in/vikram-bose", phone: "8888888888" } },
        ],
        googleForm: "" // add if you have a registration link
      },
      // other workshops data comes here and i have that
    ],
    []
  );

  const openDetails = (ev) => {
    setSelectedEvent(ev);
    setDetailsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = "";
  };

  const onRegisterClick = (ev) => {
    const url = ev.googleForm || "https://forms.gle/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderCards = (list) => (
    <div className="cards-track">
      {list.map((ev, i) => (
        <article className="event-card" key={ev.title + i}>
          <div className="card-media">
            <img src={ev.image} alt={`${ev.title}`} loading="lazy" />
            <span className="card-tag">{i + 1}</span>
            <i className="card-shine" />
          </div>

          <div className="card-content">
            <h3 className="card-title">{ev.title}</h3>
            {ev.category && (
              <span className={`category-tag ${ev.category}`}>
                {ev.category === "tech" ? "Tech" : ev.category === "workshop" ? "Workshop" : "Non-Tech"}
              </span>
            )}
            <div className="card-actions">
              <button className="btn view-btn" onClick={() => openDetails(ev)}>
                <span>Details</span>
              </button>
              <button className="btn register-link" onClick={() => onRegisterClick(ev)}>
                <span>Register</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  // --- Registration notice modal state/effects ---
  const [noticeOpen, setNoticeOpen] = useState(false);

  // open on mount (show when user enters the page)
  useEffect(() => {
    setNoticeOpen(true);
  }, []);

  // lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = noticeOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [noticeOpen]);

  const closeNotice = () => setNoticeOpen(false);


  return (

    <>
      {noticeOpen && (
        <div
          className="ieee-notice-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ieee-notice-title"
          aria-describedby="ieee-notice-desc"
          onClick={closeNotice}
        >
          <div className="ieee-notice-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="ieee-notice-close"
              onClick={closeNotice}
              aria-label="Close notice"
            >
              ×
            </button>

            <header className="ieee-notice-header">
              <h3 id="ieee-notice-title">Registration Notice</h3>
            </header>

            <div className="ieee-notice-body">
              <p id="ieee-notice-desc" className="ieee-notice-text">
                Each student is strictly allowed to register for only one event.
              </p>
            </div>

            <footer className="ieee-notice-footer">
              <button className="btn solid" onClick={closeNotice}>
                Understood
              </button>
            </footer>
          </div>
        </div>
      )}


      <div className="Event-page">
        <header ref={headerRef} className="event-header">
          <SparklesText
            text="IEEE DAY 2025"
            sparkleCount={25}
            sparkleSize={18}
            speed={0.5}
            sparkleColors={["#FFD700", "#FF69B4", "#7b2dd1"]}
            className="event-title"
          />
          <p className="event-subtitle">Celebrate. Learn. Build. Compete.</p>
        </header>

        <div className="event-type-container">
          <button className={`type-btn ${selectedType === "events" ? "active" : ""}`} onClick={() => setSelectedType("events")}>
            Events
          </button>
          <button className={`type-btn ${selectedType === "workshop" ? "active" : ""}`} onClick={() => setSelectedType("workshop")}>
            Workshop
          </button>
        </div>

        <section className={`events-lane ${selectedType === "events" ? "show" : "hide"}`} ref={eventsRef}>
          <h2 className="lane-title">Events</h2>
          {renderCards(technicalEvents)}
        </section>

        <section className={`events-lane ${selectedType === "workshop" ? "show" : "hide"}`} ref={workshopRef}>
          <h2 className="lane-title">Workshop</h2>
          {renderCards(workshopEvents)}
        </section>

        {detailsOpen && selectedEvent && (
          <div className="modal-backdrop" onClick={closeDetails}>
            {selectedEvent.category === "workshop" ? (
              // --- Workshop-special modal layout ---
              <aside className="modal-card workshop-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="workshop-title">
                <button className="modal-close" onClick={closeDetails} aria-label="Close">×</button>

                <header className="workshop-header">
                  <h3 id="workshop-title" className="modal-title">{selectedEvent.title}</h3>
                  <div className="workshop-meta">
                    <span className="when">{selectedEvent.dateTime}</span>
                    <span className="dot">•</span>
                    <span className="size">{selectedEvent.teamSize}</span>
                  </div>
                </header>

                <div className="modal-body workshop-body">
                  <div className="workshop-left">
                    <section className="about">
                      <h4>Theme</h4>
                      <p>{selectedEvent.theme}</p>
                    </section>

                    <section className="objectives">
                      <h4>Student Takeaways</h4>
                      <ul className="objectives-list">
                        {selectedEvent.objectives.map((o, idx) => <li key={idx}>{o}</li>)}
                      </ul>
                    </section>

                    <section className="targets">
                      <h4>Who should attend</h4>
                      <ul className="targets-list">
                        {selectedEvent.targetParticipants.map((t, idx) => <li key={idx}>{t}</li>)}
                      </ul>
                    </section>

                    <section className="pitch-section">
                      <h4>On-Spot Pitch Competition</h4>
                      <p>{selectedEvent.pitchDetails.description}</p>
                      <h5>Team rules</h5>
                      <ul>
                        {selectedEvent.pitchDetails.teamRules.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>

                      <h5>Judging criteria</h5>
                      <ol>
                        {selectedEvent.pitchDetails.judgingCriteria.map((c, i) => <li key={i}>{c}</li>)}
                      </ol>
                    </section>
                  </div>

                  <aside className="workshop-right">
                    <section className="guest-card">
                      <div className="guest-media">
                        {selectedEvent.guest?.img ? (
                          <img src={selectedEvent.guest.img} alt={selectedEvent.guest.name} />
                        ) : (
                          <div className="guest-fallback">{selectedEvent.guest?.name?.split(" ").map(n => n[0]).join("")}</div>
                        )}
                      </div>
                      <div className="guest-info">
                        <h5>{selectedEvent.guest?.name}</h5>
                        <p className="guest-title">{selectedEvent.guest?.title}</p>
                        <div className="socials">
                          {selectedEvent.guest?.socials?.instagram && (
                            <a href={selectedEvent.guest.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Guest Instagram">
                              <AiFillInstagram className="social-icon instagram" />
                            </a>
                          )}
                        </div>
                      </div>
                    </section>

                    <section className="schedule">
                      <h4>Schedule</h4>
                      <ul className="schedule-list">
                        {selectedEvent.sampleSchedule.map((s, i) => (
                          <li key={i}>
                            <span className="time">{s.time}</span>
                            <span className="activity">{s.activity}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="note">
                      <h4>Important</h4>
                      <p>On-spot registrations: First 90 seats are reserved for pre-registrations. Please arrive 15 minutes before start time for seat allocation.</p>
                    </section>

                    <section className="coordinators">
                      <h4>Coordinators</h4>
                      <div className="coordinator-grid">
                        {selectedEvent.coordinators.map((c, i) => (
                          <div className="coordinator-card" key={i}>
                            <img src={c.img} alt={c.name} />
                            <h5>{c.name}</h5>
                            <p>{c.role}</p>
                            <div className="socials">
                              {c.socials?.linkedin && (
                                <a href={c.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                  <RiLinkedinBoxFill className="social-icon linkedin" />
                                </a>
                              )}
                              {c.socials?.phone && (
                                <a href={`tel:${c.socials.phone}`}>
                                  <RiPhoneFill className="social-icon phone" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </aside>
                </div>

                <footer className="modal-footer">
                  <button className="btn ghost" onClick={closeDetails}>Close</button>
                  <button className="btn solid" onClick={() => onRegisterClick(selectedEvent)}>Register</button>
                </footer>
              </aside>
            ) : (
              // --- Default event modal (unchanged) ---
              <aside className="modal-card details-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeDetails}>×</button>

                <div className="details-header">
                  <h3 className="modal-title">{selectedEvent.title}</h3>
                </div>

                <div className="modal-body">
                  <section className="about">
                    <h4>Event description</h4>
                    <div className="rounds-list">
                      {selectedEvent.rounds.map((r, i) => (
                        <div className="round-card" key={i}>
                          <h5>{r.title}</h5>
                          <p>{r.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="event-info">
                    <h4>Event Information</h4>
                    <div className="info-card">
                      <span>📅</span>
                      <div>
                        <div className="info-label">Date & Time</div>
                        <div className="info-value">{selectedEvent.dateTime}</div>
                      </div>
                    </div>
                    <div className="info-card">
                      <span>👥</span>
                      <div>
                        <div className="info-label">Team Size</div>
                        <div className="info-value">{selectedEvent.teamSize}</div>
                      </div>
                    </div>
                  </section>

                  <section className="rules">
                    <h4>Rules & Guidelines</h4>
                    <ul className="rules-list">
                      {(selectedEvent.rules && selectedEvent.rules.length > 0
                        ? selectedEvent.rules
                        : ["No Cheating allowed.", "Respect the environment.", "Be quick and efficient.", "No automated tools."]
                      ).map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="coordinators">
                    <h4>Event Coordinators</h4>
                    <div className="coordinator-grid">
                      {selectedEvent.coordinators.map((c, i) => (
                        <div className="coordinator-card" key={i}>
                          <img src={c.img} alt={c.name} />
                          <h5>{c.name}</h5>
                          <p>{c.role}</p>
                          <div className="socials">
                            <a href={c.socials.linkedin} target="_blank" rel="noopener noreferrer">
                              <RiLinkedinBoxFill className="social-icon linkedin" />
                            </a>
                            <a href={`tel:${c.socials.phone}`}>
                              <RiPhoneFill className="social-icon phone" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="modal-footer">
                  <button className="btn ghost" onClick={closeDetails}>Close</button>
                  <button className="btn solid" onClick={() => onRegisterClick(selectedEvent)}>Register</button>
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </>
  );
}
