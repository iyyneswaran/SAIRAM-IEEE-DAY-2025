import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SparklesText } from "../modern-ui/sparkles-text";
import { RiLinkedinBoxFill, RiPhoneFill } from "react-icons/ri";
import styles from "../../styles/team.module.css";

// sit 
import chairmanImg from "../../assets/coordinators/vikrambose.jpg";
import viceChairmanImg from "../../assets/coordinators/anto.jpg";
import secretary1 from "../../assets/coordinators/SRINATHEESH S .png";
import treasurer1 from '../../assets/coordinators/vishali.jpg'
import treasurer2 from '../../assets/coordinators/subashini.jpg'
import mainSecr from '../../assets/coordinators/SANJAIKUMAR S.jpg'
import iyyneswaran from "../../assets/coordinators/iyynes.jpg";
import shivani from "../../assets/coordinators/SHIVANI png.png";
import trivikraman from "../../assets/coordinators/Trivikraman.jpg";
import annapoorani from '../../assets/coordinators/annapoorani.jpg';
import balamurugan from '../../assets/coordinators/Balamurugan.jpg';
import ajitha_anadhi from '../../assets/coordinators/ajithaanadhi.jpg';
import parveenbegum from '../../assets/coordinators/parveenbegum.jpg';
import shreyas from '../../assets/coordinators/shreya.jpg';
import krithika from '../../assets/coordinators/krithika-removebg-preview.png';
import jothiesvar from '../../assets/coordinators/jothiesvar.jpg';
import rashim from '../../assets/coordinators/rashim.jpg';
import ajithaangelian from '../../assets/coordinators/ajithaangelian.jpg'

// patrons 
import sitprince from '../../assets/patrons/sitprincipal.jpg';
import secprince from '../../assets/patrons/secprincipal.jpg';
import ceo from '../../assets/patrons/ceo.jpg';

// society scope 
import alagumurugan from '../../assets/scope/alagumurugan.jpeg';
import brinda from '../../assets/scope/BrindhaSaminathan.png';
import saritha from '../../assets/scope/saritha.jpeg';
import prabavathi from '../../assets/scope/prabavathi.webp';
import somaprathibha from '../../assets/scope/somaprathibha.jpeg';

// community scope
import brindhadevi from '../../assets/scope/brindhadevi.jpeg';
import priya from '../../assets/scope/epriya.jpeg';
import rayavel from '../../assets/scope/rayavel.jpeg';
import subha from '../../assets/scope/subhamam.jpg';
import swagata from '../../assets/scope/swagata.jpeg';

// sec
import sriram from '../../assets/coordinators/sriram.jpg'
import secViceChairImg from '../../assets/coordinators/Nataraj EL_Vice Chair_Elect.jpg'
import secpresentinf from '../../assets/coordinators/Gengaraj P - Present - Influencer_.jpg'
import secpresentAdv from '../../assets/coordinators/Jagadeesh G  - Present - Advocate .jpeg'
import secElectCom from '../../assets/coordinators/LINGESH PT -Elect Communicator.jpg'
import secElectCom2 from '../../assets/coordinators/M PRAGADEESHWARAN_Communicator Elect.jpg'
import secPresentSecr from '../../assets/coordinators/PAVITHRAN M - Present Secretary.jpg'
import secElectChair from '../../assets/coordinators/SANJAY S(ELECTED CHAIRPERSON).png'
import secPresentCom from '../../assets/coordinators/SRI SAAI SEENU D J - PRESENT COMMUNICATOR_.jpg'
import secMainSecr from '../../assets/coordinators/SRINIDHI T - MAIN ( SECRETARY ).jpg'
import secElectSecr from '../../assets/coordinators/Tejashree M J_Secretary_Elect.jpg'


export default function Team() {
  const wrapperRef = useRef(null);

  const chiefPatrons = [
    {
      title: "Dr.Sai Prakash LeoMuthu",
      name: "Chairman & CEO, Sairam Institutions",
      // desc: "Leading with vision and precision.",
      img: ceo,
      // linkedin: "https://www.linkedin.com/in/sairamceo?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      // phone: "9962077773",
    },
    {
      title: "Dr.K.Palanikumar",
      name: "Principal of SIT",
      // desc: "Head of SIT — academic & administrative leadership.",
      img: sitprince,
      // linkedin: "https://www.linkedin.com/in/dr-palanikumar-k-5ba50827",
      // phone: "9677053338",
    },
    {
      title: "Dr.J.Raja",
      name: "Principal of SEC",
      // desc: "Student body representative.",
      img: secprince,
      // linkedin: "https://www.linkedin.com/in/raja-j-32b44164",
      // phone: "9962077773",
    },
  ];

  const makeGenericCards = (prefix, imgSrc, count = 10) =>
    Array.from({ length: count }, (_, i) => ({
      title: `${prefix} Member ${i + 1}`,
      desc: `${prefix} contributor — short role/line.`,
      img: imgSrc,
      linkedin: "",
      phone: "",
    }));

  // const societyCards = makeGenericCards("Society", swagata, 10);
  const societyCards = [
    {
      title: "Dr.V.Brindha Devi",
      name: "Strategist",
      img: brindhadevi,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.Swagata Sarkar",
      name: "Captain",
      img: swagata,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.S.Subha",
      name: "Organizer",
      img: subha,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.E.Priya",
      name: "Propagator",
      img: priya,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.P.Rayavel",
      name: "Executor",
      img: rayavel,
      linkedin: "",
      phone: "",
    },
  ];

  const communityCards = [
    {
      title: "Dr.R.Azhagumurugan",
      name: "Strategist",
      img: alagumurugan,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.S.Brindha",
      name: "Captain",
      img: brinda,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.G.Saritha",
      name: "Organizer",
      img: saritha,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.R.Prabavathi",
      name: "Propagator",
      img: prabavathi,
      linkedin: "",
      phone: "",
    },
    {
      title: "Dr.Soma Prathibha",
      name: "Executor",
      img: somaprathibha,
      linkedin: "",
      phone: "",
    },
  ]
  // const communityCards = makeGenericCards("Community", mastermindImg, 10);

  const studentTeam = [
    {
      title: "Vikram Bose",
      name: "Chairman",
      img: chairmanImg,
      linkedin: "https://www.linkedin.com/in/vikram-bose-msu-ba1507258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
      phone: "9003133237",
    },
    {
      title: "Sri Raman M",
      name: "Chairman",
      img: sriram,
      linkedin: "https://www.linkedin.com/in/sri-raman-m-321505253/",
      phone: "9940527926",
    },
    {
      title: "Krithika",
      name: "Chairperson",
      img: krithika,
      linkedin: "https://www.linkedin.com/in/krithika2805",
      phone: "9600203722",
    },
    {
      title: "Anto Aswin Herts J",
      name: "Vice Chairman",
      img: viceChairmanImg,
      linkedin: "https://linkedin.com/in/imantoashwin",
      phone: "8220511287",
    },
    {
      title: "Ajitha Angelian J",
      name: "Vice Chairperson",
      img: ajithaangelian,
      linkedin: "https://www.linkedin.com/in/ajitha-angelian-j/",
      phone: "8925708639",
    },
    {
      title: "Nataraj E L",
      name: "Vice Chairman",
      img: secViceChairImg,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Sanjaikumar S",
      name: "Secretary",
      img: mainSecr,
      linkedin: "https://www.linkedin.com/in/sanjaikumar-s-24699a299",
      phone: "6380909173",
    },
    {
      title: "Srinatheesh S",
      name: "Secretary",
      img: secretary1,
      linkedin: "https://www.linkedin.com/in/srinatheesh-s-b609b8264",
      phone: "9677151449",
    },
    {
      title: "Vishali R",
      name: "Treasurer",
      img: treasurer1,
      linkedin: "https://www.linkedin.com/in/vishali-r-421a05256/",
      phone: "8825462595",
    },
    {
      title: "Subashini M",
      name: "Treasurer",
      img: treasurer2,
      linkedin: "https://www.linkedin.com/in/subashini-mannuraj-93b483254/",
      phone: "7305056323",
    },
    {
      title: "Rashim R B",
      name: "Webmaster",
      img: rashim,
      linkedin: "https://www.linkedin.com/in/rashimraseethali/",
      phone: "7000000000",
    },
    {
      title: "Jothiesvar K",
      name: "Webmaster",
      img: jothiesvar,
      linkedin: "https://www.linkedin.com/in/jothiesvar-k?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "7358666564",
    },
    {
      title: "Gengaraj P",
      name: "Influencer",
      img: secpresentinf,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Jagadeesh G",
      name: "Advocate",
      img: secpresentAdv,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Lingesh P T",
      name: "Communicator",
      img: secElectCom,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Pragadeeshwaran M",
      name: "Communicator",
      img: secElectCom2,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Sanjay S",
      name: "Chairman",
      img: secElectChair,
      linkedin: "https://www.linkedin.com/in/sanjay-s-3116a8296/",
      phone: "9788887321",
    },
    {
      title: "Sri Sai Seenu D J",
      name: "Communicator",
      img: secPresentCom,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Pavithran M",
      name: "Secretary",
      img: secPresentSecr,
      linkedin: "https://www.linkedin.com/in/trivikraman-t-s2828a2291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "7845194171",
    },
    {
      title: "Srinidhi T",
      name: "Secretary",
      img: secMainSecr,
      linkedin: "https://www.linkedin.com/in/srinidhithiyagarajan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "9600057439",
    },
    {
      title: "Tejashree M J",
      name: "Secretary",
      img: secElectSecr,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    // {
    //   title: "Vithasini V",
    //   name: "Webmaster",
    //   img: communicatorImg,
    //   linkedin: "https://linkedin.com",
    //   phone: "7000000000",
    // },
    {
      title: "Iyyneswaran P",
      name: "Communicator",
      img: iyyneswaran,
      linkedin: "https://www.linkedin.com/in/iyyneswaran07?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "9042524161",
    },
    {
      title: "Shivani M S",
      name: "Guide",
      img: shivani,
      linkedin: "https://www.linkedin.com/in/shivani-ms",
      phone: "6374785113",
    },
    {
      title: "TRIVIKRAMAN T S",
      name: "Mastermind",
      img: trivikraman,
      linkedin: "https://www.linkedin.com/in/pavithran-ma77b20296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "8838218061",
    },
    {
      title: "Annapoorani A",
      name: "Secretary",
      img: annapoorani,
      linkedin: "https://www.linkedin.com/in/annapoorani-alagananthan/",
      phone: "9361528505",
    },
    {
      title: "Balamurugan",
      name: "Secretary",
      img: balamurugan,
      linkedin: "https://www.linkedin.com/in/balamurugan-sakthivel-443080294",
      phone: "9042948523",
    },
    {
      title: "Ajitha Ananthi J",
      name: "Advocate ",
      img: ajitha_anadhi,
      linkedin: "https://www.linkedin.com/in/ajitha268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "9789846676",
    },
    {
      title: "Parveen Begum T",
      name: "Mastermind",
      img: parveenbegum,
      linkedin: "https://www.linkedin.com/in/parveen-begum-t-12b54a277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "9500177775",
    },
    {
      title: "Shreyas",
      name: "Communicator",
      img: shreyas,
      linkedin: "https://www.linkedin.com/in/shreyasdhanabal2905?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      phone: "9952942852",
    },
  ];

  /* Animations */
  useEffect(() => {
    gsap.from(wrapperRef.current, {
      y: 10,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    const headers = document.querySelectorAll(`.${styles.sectionHeader}`);
    gsap.from(headers, {
      y: -12,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
    });

    const cards = document.querySelectorAll(`.${styles.profileCard}`);
    gsap.fromTo(
      cards,
      { y: 24, opacity: 0, rotate: -0.5 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, []);

  const renderCard = (c, idx) => (
    <article className={styles.profileCard} key={(c.title || "") + idx}>
      <div className={styles.cardImage}>
        <img
          src={c.img}
          alt={`${c.title}${c.name ? ` — ${c.name}` : ""}`}
          loading="lazy"
        />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>
          {c.title} {c.name ? <span className={styles.cardNameSuffix}> {c.name}</span> : null}
        </h3>
        {/* <p className={styles.cardDesc}>{c.desc}</p> */}

        <div className={styles.cardLinks}>
          {c.linkedin ? (
            <a href={c.linkedin} target="_blank" rel="noopener noreferrer">
              <RiLinkedinBoxFill className={styles.iconLinkedin} />
            </a>
          ) : (
            <span className={styles.iconPlaceholder} />
          )}
          {c.phone ? (
            <a href={`tel:${c.phone}`}>
              <RiPhoneFill className={styles.iconPhone} />
            </a>
          ) : (
            <span className={styles.iconPlaceholder} />
          )}
        </div>
      </div>
    </article>
  );

  return (
    <div ref={wrapperRef} className={styles.aboutWrapper}>
      {/* --- CHIEF PATRONS --- */}
      <section className={styles.section}>
        <header className={`${styles.sectionHeader} ${styles.centerHeader}`}>
          <SparklesText
            text="PATRONS"
            sparkleCount={10}
            sparkleSize={12}
            speed={0.6}
            sparkleColors={["#7b2dd1", "#ff69b4", "#ffd700"]}
            className={styles.sectionTitle}
          />
        </header>

        <div className={styles.patronsGrid}>
          {chiefPatrons.map((p, i) => renderCard(p, `patron-${i}`))}
        </div>
      </section>


      {/*SCOPE: SOCIETY */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <SparklesText
            text="SOCIETY SCOPE"
            sparkleCount={10}
            sparkleSize={12}
            speed={0.6}
            sparkleColors={["#7b2dd1", "#ff69b4"]}
            className={styles.sectionTitle}
          />
        </header>

        {/* SOCIETY */}
        <div className={styles.subSection}>
          {/* <h4 className={styles.subHeader}>SOCIETY</h4> */}
          <div className={styles.gridFive}>{communityCards.map(renderCard)}</div>
        </div>

      </section>

      {/*  SCOPE: COMMUNITY */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <SparklesText
            text="COMMUNITY SCOPE"
            sparkleCount={10}
            sparkleSize={12}
            speed={0.6}
            sparkleColors={["#7b2dd1", "#ff69b4"]}
            className={styles.sectionTitle}
          />
        </header>

        {/* SOCIETY */}
        <div className={styles.subSection}>
          {/* <h4 className={styles.subHeader}>SOCIETY</h4> */}
          <div className={styles.gridFive}>{societyCards.map(renderCard)}</div>
        </div>

      </section>

      {/* --- STUDENT TEAM --- */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <SparklesText
            text="STUDENT TEAM"
            sparkleCount={12}
            sparkleSize={12}
            speed={0.6}
            sparkleColors={["#7b2dd1", "#ffd700"]}
            className={styles.sectionTitle}
          />
        </header>

        <div className={styles.gridFive}>{studentTeam.map(renderCard)}</div>
        {/* add or update the studentTeam array above to show more cards */}
      </section>
    </div>
  );
}
