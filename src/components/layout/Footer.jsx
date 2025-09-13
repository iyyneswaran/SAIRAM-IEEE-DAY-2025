// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import LOGO from "../../assets/logo/ieeelogo.png"
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="ieee-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={LOGO} alt="IEEE Day Logo" className="footer-logo" />
          <p>
            IEEE Day celebrates the first time in history when engineers worldwide gathered to
            share their technical ideas in 1884. Join us as we celebrate innovation, learning, and collaboration.
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Useful Links</h4>
          <ul>
            <li><Link to="/events">Events</Link></li>
            {/* <li><a href="#about">About</a></li> */}
            <li><Link to="/team">Crew</Link></li>
          </ul>
        </div>

        <div className="footer-time">
          <h4>Working Time</h4>
          <p>Mon - Sat: 9.00am - 6.00pm</p>
          {/* <p>Saturday: 10.00am - 6.00pm</p> */}
          <p>Sunday Closed</p>
        </div>

        <div className="footer-address">
          <h4>Our Address</h4>
          <p>
            Sai Leo Nagar, West Tambaram, <br />
            Chennai – 600 044.<br />
            Tamil Nadu. India<br />
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Terms & Conditions | Privacy Policy</p>
        <p>Copyright © 2025 IEEE Day. All Rights Reserved.</p>
      </div>
    </footer>
  );
}