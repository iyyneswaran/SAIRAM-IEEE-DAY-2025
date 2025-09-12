import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SparklesText } from "../modern-ui/sparkles-text";
import { RiLinkedinBoxFill, RiPhoneFill } from "react-icons/ri";
import styles from "../../styles/team.module.css";

// sit 
import dummy from "../../assets/coordinators/d.jpg";
import chairmanImg from "../../assets/coordinators/vikrambose.jpg";
import viceChairmanImg from "../../assets/coordinators/anto.jpg";
import secretary1 from '../../assets/coordinators/Srinatheesh.png'
import communicatorImg from "../../assets/coordinators/iyynes.jpg";
import mastermindImg from "../../assets/coordinators/trivikraman.jpg";
import treasurer1 from '../../assets/coordinators/Vishali.jpg'
import treasurer2 from '../../assets/coordinators/subhashini.jpg'
import mainSecr from '../../assets/coordinators/SANJAIKUMAR.jpg'

// sec
import secViceChairImg from '../../assets/coordinators/Nataraj.jpg'
import secpresentinf from '../../assets/coordinators/Gengaraj.jpg'
import secpresentAdv from '../../assets/coordinators/Jagadeesh.jpeg'
import secElectCom from '../../assets/coordinators/LINGESH.jpg'
import secElectCom2 from '../../assets/coordinators/PRAGADEESHWARAN.jpg'
import secPresentSecr from '../../assets/coordinators/PAVITHRAN.jpg'
import secElectChair from '../../assets/coordinators/SANJAY.png'
import secPresentCom from '../../assets/coordinators/srisaiseenu.jpg'
import secMainSecr from '../../assets/coordinators/SRINIDHI.jpg'
import secElectSecr from '../../assets/coordinators/tejashree1.jpg'


export default function Team() {
  const wrapperRef = useRef(null);

  const chiefPatrons = [
    {
      title: "Principal",
      name: "Dr.K.Palanikumar",
      // desc: "Head of SIT — academic & administrative leadership.",
      img: dummy,
      linkedin: "https://linkedin.com",
      phone: "9876543210",
    },
    {
      title: "Chairman",
      name: "Sai Prakash LeoMuthu",
      // desc: "Leading with vision and precision.",
      img: dummy,
      linkedin: "https://linkedin.com",
      phone: "1234567890",
    },
    {
      title: "Principal",
      name: "Student Executive Council",
      // desc: "Student body representative.",
      img: dummy,
      linkedin: "https://linkedin.com",
      phone: "9988776655",
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

  const societyCards = makeGenericCards("Society", communicatorImg, 10);
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
      title: "Sriram",
      name: "Chairman",
      img: chairmanImg,
      linkedin: "https://www.linkedin.com/in/sri-raman-m-321505253/",
      phone: "9940527926",
    },
    {
      title: "Anto Aswin Herts J",
      name: "Vice Chairman",
      img: viceChairmanImg,
      linkedin: "https://linkedin.com",
      phone: "8220511287",
    },
    //  {
    //   title: "Ajitha Angelian J",
    //   name: "A. Developer",
    //   desc: "Project lead & coordinator.",
    //   img: communicatorImg,
    //   linkedin: "https://linkedin.com",
    //   phone: "7000000000",
    // },
    {
      title: "Nataraj",
      name: "Vice Chairman",
      img: secViceChairImg,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Sanjaikumar S",
      name: "Secretary",
      img: mainSecr,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Srinatheesh",
      name: "Secretary",
      img: secretary1,
      linkedin: "https://linkedin.com",
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
      title: "Subhashini M",
      name: "Treasurer",
      img: treasurer2,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    // {
    //   title: "Rashim R B",
    //   name: "Webmaster",
    //   img: communicatorImg,
    //   linkedin: "https://linkedin.com",
    //   phone: "7000000000",
    // },
    // {
    //   title: "Jothiesvar K",
    //   name: "Webmaster",
    //   img: communicatorImg,
    //   linkedin: "https://linkedin.com",
    //   phone: "7000000000",
    // },
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
      linkedin: "https://linkedin.com",
      phone: "7000000000",
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
      linkedin: "https://linkedin.com",
      phone: "7000000000",
    },
    {
      title: "Srinidhi T",
      name: "Secretary",
      img: secMainSecr,
      linkedin: "https://linkedin.com",
      phone: "7000000000",
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

      {/* --- SCOPE: SOCIETY & COMMUNITY --- */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <SparklesText
            text="SCOPE"
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
