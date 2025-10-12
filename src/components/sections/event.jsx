import React, { useMemo, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesText } from "../modern-ui/sparkles-text";
import "../../styles/Event.css";

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
import tech_leadership_conclave from '../../assets/events-img/work1.jpg'

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
import prag from '../../assets/coordinators/M PRAGADEESHWARAN_Communicator Elect.jpg'
import adi from '../../assets/coordinators/Screenshot 2025-09-28 143208.png'

// guest 
import guest1 from '../../assets/coordinators/Screenshot 2025-09-28 215734.png'


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
      {
        title: "Circuit Craze",
        dateTime: "18 Sep, 12:00 PM",
        teamSize: "2 Members",
        image: circuitCraze,
        category: "tech",
        coordinators: [
          { name: "Trivikraman. T S", role: "Mastermind", img: trivikraman, socials: { linkedin: "https://www.linkedin.com/in/trivikraman-t-s-2828a2291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "8838218061" } },
          { name: "Pavithran M", role: "Secretary", img: pavithran, socials: { linkedin: "https://www.linkedin.com/in/pavithran-m-a77b20296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "7845194171" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSeM1IVkV5rKCj467fdSEx1aUtQKc2FrBi_7xNbbwi6BSf_F6g/viewform?usp=header",
        rounds: [
          { title: "", desc: "Ignite your inner tech genius at Circuit Craze, where circuits spark creativity and  challenges ignite excitement! Unleash your skills in a high voltage showdown of wits and innovation. Dare to  dominate the board? Join the ultimate tech battleground and leave your mark in the world of electrifying engineering feats!" },
        ],
        rules: [
          "The use of phones is strictly prohibited during the event.",
          " Collaboration or assistance between teams is not permitted.",
          "Each team must consist of exactly two members.",
          "Participants with prior knowledge of circuits are encouraged."
        ]
      },
      {
        title: "Hack Tales",
        dateTime: "19 Sep, 10:00 AM",
        teamSize: "2-3 Members",
        image: hacktales,
        category: "tech",
        coordinators: [
          { name: "Annapoorani A", role: "Coordinator", img: annapoorani, socials: { linkedin: "https://www.linkedin.com/in/annapoorani-alagananthan/", phone: "9361528505" } },
          { name: "Sanjay S", role: "Secretary", img: sanjays, socials: { linkedin: "https://www.linkedin.com/in/sanjay-s-3116a8296/", phone: "9788887321" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSfyJrnSNJOdOWR2h45R5lexeI8gP2h34Ucf8H9xDEPIQR-J_w/viewform?usp=header",
        rounds: [
          { title: "", desc: "Hacktales is a coding competition where logic, creativity, and quick thinking collide. With riddles, fun coding constraints, and a final storytelling twist, participants must prove their wit as much as their programming skills. Only the sharpest minds will decode the puzzles, bend the rules, and craft a story through code!" },
        ],
        rules: [
          "Round 1 (Code Riddles): Solve logic-based riddles/puzzles within the given time limit.",
          " Round 2 (Constraint Coding): Solve coding challenges under surprise restrictions (e.g., limited lines of code, no if-else, single loop use, etc.).",
          "Round 3 (Code-a-Story): Build a creative solution based on a theme or story prompt (pseudo-code, mockup, or code).",
          "Use of the internet is restricted to language syntax/reference only; direct solution lookup is prohibited.",
          "Teams must submit solutions within the given time frame; late submissions will not be considered.",
          " Plagiarism or code copying between teams leads to immediate disqualification.",
          "Judges’ decision will be final and binding in all rounds."
        ]
      },
      {
        title: "Promptopia",
        dateTime: "19 Sep, 02:00 PM",
        teamSize: "2 - 3 Members",
        image: promptopia,
        category: "tech",
        coordinators: [
          { name: "Balamurugan", role: "Coordinator", img: balamurugan, socials: { linkedin: "https://www.linkedin.com/in/balamurugan-sakthivel-443080294", phone: "9042948523" } },
          { name: "Srinidhi T", role: "Secretary", img: srinidhi, socials: { linkedin: "https://www.linkedin.com/in/srinidhithiyagarajan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "9600057439" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSfmAVCD3TG1jJQZZBYYptP5MTSyaQt3W5jFB9ar2SCGvd46NQ/viewform?usp=header",
        rounds: [
          { title: "", desc: "Promptopia is a thrilling AI-powered challenge where teams showcase creativity and prompt engineering skills across word guessing, image replication, and website design, blending innovation, observation, and AI collaboration for futuristic problem-solving." },
        ],
        rules: [
          "Team Size: 2 -3 Members (Solo participation not allowed).",
          "Time Limit: 15–20 minutes per round; late submissions will not be accepted.",
          "Theme Adherence: Memes must strictly match the announced theme.",
          "Original Work: All memes must be created during the event; no pre-made or copied memes.",
          "Anonymous Entries: Submissions will be tagged with numbers only; revealing identity is forbidden.",
          "Fair Play: Do not attempt to influence voting or reveal your identity; violators will be disqualified.",
          "Submission Format: Only image formats (JPEG/PNG) will be accepted.",
          "Voting: Audience + participants vote; self-voting is not allowed.",
          "Elimination: Organizers’ scoring & screening will decide progression each round.",
          "Final Authority: Judges’ and organizers’ decisions are final and binding.",
          "A suprise design meme round will be conducted"
        ]
      },
      {
        title: "Reverzion",
        dateTime: "19 Sep, 02:00 PM",
        teamSize: "2 - 3 Members",
        image: reverzion,
        category: "tech",
        coordinators: [
          { name: "Iyyneswaran P", role: "Communicator", img: iyyneswaran, socials: { linkedin: "https://www.linkedin.com/in/iyyneswaran07?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "9042524161" } },
          { name: "Gengaraj ", role: "Treasurer", img: Gengaraj, socials: { linkedin: "http://linkedin.com/in/sreelaya-gopal-b0a584290", phone: "8838595065" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSeJdFeA47utC0GGNkSAgUWq5SGgFQe0n0_8w0RppWL7Co8pUg/viewform?usp=header",
        rounds: [
          { title: "", desc: "Unmask the secrets of tomorrow’s tech today!! In Reverse Engineering the Future, every mystery gadget hides a logic to decode. No codes, no manuals, only your curiosity and sharp thinking. Crack the system, then upgrade it into the next innovation!!!" },
        ],
        rules: [
          "Teams must have 2–3 members.",
          "Round 1 is compulsory for all teams.",
          "Use of internet or external help during rounds is strictly prohibited.",
          "Decisions of the judges are final and binding.",
          "Time limits must be strictly followed.",
          "Plagiarism or copying from other teams will lead to disqualification."
        ]
      },
      {
        title: "Pwnage Party",
        dateTime: "19 Sep, 02:00 PM",
        teamSize: "3 Members",
        image: pwnage_party,
        category: "tech",
        coordinators: [
          { name: "Vikram Bose", role: "Chairman", img: Vikrambose, socials: { linkedin: "https://www.linkedin.com/in/vikram-bose-msu-ba1507258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "9003133237" } },
          { name: "Tejashree MJ", role: "Guide", img: tejashree, socials: { linkedin: "https://www.linkedin.com/in/tejashree-m-j-5197652b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "8667543967" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSdkSU0kHWH7sw3mwuMaUFECeKzmhKgme00KruAJJs_o0Jzgsw/viewform?usp=header",
        rounds: [
          { title: "", desc: "Ready to put your skills to the test?!! Dive into a high-stakes Capture the Flag competition where you and your teammates will face off against cunning challenges. This isn't just about speed; it's about strategy, problem-solving, and a little bit of wit. Think you have what it takes to outsmart the rest and claim victory?!!" },
        ],
        rules: [
          "No Cheating: Sharing flags or solutions with other teams is strictly forbidden and will result in disqualification.",
          "Respect the Target: Only interact with the websites to find flags. Do not exploit or damage them in any other way.",
          "Points and Speed: The faster you find and submit a flag, the more points you earn. Be quick!",
          "No Sabotage: Do not modify or corrupt the challenges, which would ruin the game for others.",
          "No Automated Scans: Do not use automated tools that can overload the game environment.",
          "Stay Focused: Use the event resources solely for the competition. No personal use or unrelated activities are allowed."
        ]
      },
      {
        title: "CrypticX",
        dateTime: "19 Sep, 02:00 PM",
        teamSize: "2 - 3 Members",
        image: cryticx,
        category: "tech",
        coordinators: [
          { name: "Ajitha Ananthi J", role: "Advocate ", img: ajitha_anadhi, socials: { linkedin: "https://www.linkedin.com/in/ajitha268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "9789846676" } },
          { name: "Lingesh P T", role: "Communicator", img: lingesh, socials: { linkedin: "http://linkedin.com/in/sreelaya-gopal-b0a584290", phone: "9042023989" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSe0-Dd4C0sDTo_TyGVf0qzNHQ2cmTjTzXQZgqEsJ0CI-s2pWw/viewform?usp=header",
        rounds: [
          { title: "", desc: "Scan, solve, and sprint! An interactive treasure hunt that blends tech knowledge with a thrilling race against time." },
        ],
        rules: [
          "Teams of 2–3 participants.",
          " A QR code will be placed at various hidden campus locations.",
          " On scanning the code, participants receive a puzzle or riddle related to IEEE / tech concepts.",
          "After solving, participants face two QR options: one dummy misleading code with no clue, and one correct code guiding them forward.",
          "Teams must find the correct sequence of QR codes to reach the final destination.",
          "Fair Play: No cheating or outside help. Teams must work independently.",
          "The first team to reach the final point is declared the winner.",
          "Judging based on creativity + humor.",
        ]
      },
      {
        title: "Quirky Tank",
        dateTime: "18 Sep, 10:00 AM",
        teamSize: "2 - 3 Members",
        image: quirkytank,
        category: "Non-Tech",
        coordinators: [
          { name: "Shivani M S", role: "Guide", img: shivani, socials: { linkedin: "https://www.linkedin.com/in/shivani-ms", phone: "6374785113" } },
          { name: "Nataraj E L", role: "Vice Chair", img: nataraj, socials: { linkedin: "https://www.linkedin.com/in/nataraj-el", phone: "8778380813" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLScg8w-FuM-YrgXjyjrmebOwAx6im2iLTli_a96pd4_3X0Ba9w/viewform?usp=header",
        rounds: [
          { title: "", desc: "Quirky Tank is a fun spin on Shark Tank! Teams will be given random, quirky objects and must pitch them as the next big invention. With funny names, catchy taglines, and wacky features, it’s all about creativity, humour, and convincing skills." },
        ],
        rules: [
          "Object Allotment – Quirky objects will be given on the spot by the coordinators; no exchanges allowed among the teams.",
          "Preparation Time – Teams will get 3 minutes to prepare their pitch.",
          "Pitch Time – Each team will get 3 minutes to present their pitch on stage. Exceeding time will lead to penalties.",
          "Each pitch must showcase a creative product name, catchy tagline, two funny features, and a strong reason for investor funding.",
          "Participation – Both members must speak and be actively involved in the pitch.",
          "Presentation Style – Humor, roleplay, and dramatization are allowed and encouraged.",
          "Code of Conduct – No offensive, disrespectful, or sensitive content will be entertained.",
          "Time Discipline – Teams must stop when time is up.",
          "Authority – Decisions of coordinators/judges are final and binding."
        ]
      },
      {
        title: "Viral Lolgorithms",
        dateTime: "19 Sep, 02:00 PM",
        teamSize: "Solo Entries Only",
        image: viralLolgorithms,
        category: "Non-Tech",
        coordinators: [
          { name: "Parveen Begum T", role: "Mastermind", img: parveenbegum, socials: { linkedin: "https://www.linkedin.com/in/parveen-begum-t-12b54a277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "9500177775" } },
          { name: "Sreelaya G", role: "Influencer", img: sreelaya, socials: { linkedin: "http://linkedin.com/in/sreelaya-gopal-b0a584290", phone: "9043629957" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSdtQuKuSvDMLXJhhTJ13JBfSoTXSRTn4yHmbsJV_5EfDFvNaQ/viewform?usp=header",
        rounds: [
          { title: "", desc: "“Laughter + Logic = Viral Lolgorithms!” Get ready for a meme war like no other , three thrilling rounds, anonymous entries, and themes that push your creativity to the edge. Bring your humor, let your memes do the talking, and battle it out to go viral." },
        ],
        rules: [
          "Stick to the theme! Off-topic memes don’t count.",
          "No offensive or harmful content – we can reject entries if needed.",
          "Voting is anonymous and you cannot vote for yourself."
        ]
      },
    ],
    []
  );

  const workshopEvents = useMemo(
    () => [
      {
        title: "Tech Leadership Conclave",
        dateTime: "09:30 AM – 03:50 PM (Date: Will be announced)",
        totalseats: '120',
        teamSize: "Individual / Pitch Competition: Teams of 3",
        image: tech_leadership_conclave,
        category: "workshop",
        guest: {
          name: "Ramdhan MP",
          title: "Founder / CEO of Artyland",
          img: guest1,
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
          { time: "09:30 AM - 09:50 AM", activity: "On-spot registrations — First 120 seats reserved for pre-registrations" },
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
          { name: "Aaditya Shyambarish ", role: "Influencer", img: adi, socials: { linkedin: "https://www.linkedin.com/in/r-aaditya-shyambarish-43b957296/w", phone: "9344373775" } },
          { name: "Sreelaya G ", role: "Influencer", img: sreelaya, socials: { linkedin: "http://linkedin.com/in/sreelaya-gopal-b0a584290", phone: "9043629957" } },
          { name: "Pragadeeshwaran M ", role: "Communicator", img: prag, socials: { linkedin: "https://www.linkedin.com/in/pragadeeshwaran-m-15141a299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", phone: "8778677615" } },
        ],
        googleForm: "https://docs.google.com/forms/d/e/1FAIpQLScei2Gp_8fKPEFlQfsShAdyO8hGVrYyBFoUzo5ZPShjWcQkaw/viewform"
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
              <button className="btn register-link" disabled onClick={() => onRegisterClick(ev)}>
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
                      <p>On-spot registrations: First 120 seats are reserved for pre-registrations. Please arrive 15 minutes before start time for seat allocation.</p>
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
                    {/* <div className="info-card">
                      <span>📅</span>
                      <div>
                        <div className="info-label">Date & Time</div>
                        <div className="info-value">{selectedEvent.dateTime}</div>
                      </div>
                    </div> */}
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
