import React, { useEffect, useRef } from "react";
import styles from "../../styles/about.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesText } from "../modern-ui/sparkles-text";
import ieeeImg from "../../assets/logo/ieeelogo.png";
import sairamImg from '../../assets/logo/ieee_sairam.png'

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(`.${styles.card}`);

    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.3,
        }
      );
    });

    // Floating animation for text containers
    gsap.utils.toArray(`.${styles.textContainer}`).forEach((el) => {
      gsap.to(el, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div id="about">

      <center>
        <div
          className="sparkles-wrap animate"
          style={{ animationDelay: "0.38s" }}
        >
          <SparklesText
            text="About Us"
            sparkleCount={10}
            sparkleSize={18}
            speed={0.3}
            sparkleColors={["#FFD700", "#FF69B4", "#7b2dd1"]}
            className="text-5xl font-extrabold hero-sparkles timeline-heading"
          />
        </div>
      </center>

      <section className={styles.aboutUs} ref={sectionRef}>
        {/* Card 1 */}
        <div className={`${styles.card} ${styles.card1}`}>
          <div className={`${styles.textContainer} ${styles.textContainer1}`}>
            <h2>IEEE DAY</h2>
            <p>
              IEEE Day celebrates the first time in history when engineers
              worldwide gathered to share their technical ideas. It focuses on
              leveraging technology for a better tomorrow, fostering innovation,
              collaboration, and inspiration across the globe.
            </p>
          </div>
          <div className={`${styles.imageContainer} ${styles.imageContainer1}`}>
            <img src={ieeeImg} alt="IEEE Day" />
          </div>
        </div>

        {/* Card 2 */}
        <div className={`${styles.card} ${styles.card2}`}>
          <div className={styles.imageContainer}>
            <img src={sairamImg} alt="Sairam IEEE" />
          </div>
          <div className={styles.textContainer}>
            <h2>Sairam IEEE</h2>
            <p>
              The IEEE Student Branch at Sairam Institutions encourages
              students to innovate, research, and explore emerging technologies.
              It provides a platform for technical growth, networking, and
              professional development through workshops, hackathons, and events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
