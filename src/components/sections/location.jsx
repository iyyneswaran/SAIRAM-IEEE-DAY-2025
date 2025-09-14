import "../../styles/location.css";
import { SparklesText } from "../modern-ui/sparkles-text";

export default function Location() {
  return (
    <section id="location">
      <div className="location-container">
        <center>
          <SparklesText
            text="OUR LOCATION"
            sparkleCount={15}
            sparkleSize={8}
            speed={0.1}
            sparkleColors={["#FFD700", "#FF69B4", "#7b2dd1"]}
            className="about-title"
          />
        </center>

        <p className="location-desc">
          Welcome to <span>Sri Sairam Institutions</span>, Chennai — a
          premier institution known for excellence in education, innovation, and
          research. Located in a serene green campus, Sairam provides the
          perfect environment for academic growth, industry collaboration, and
          holistic student development.
        </p>

        {/* Google Map */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62210.90848302059!2d79.98118944863282!3d12.9602171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f596c7fb72c9%3A0x8e7a30529f9ef227!2sSri%20Sairam%20Engineering%20College!5e0!3m2!1sen!2sin!4v1756748768874!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sri Sairam Engineering College Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
