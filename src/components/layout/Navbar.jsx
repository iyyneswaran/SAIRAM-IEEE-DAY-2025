import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import { FaBars } from "react-icons/fa";
import LOGO from "../../assets/logo/ieeelogo.png"
import { useState } from "react";
import Button1 from "../common/Button1";
import { ScrollProgress } from "@/components/magicui/scroll-progress";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="navbar-container">

        <div className="logo-container">
          <a href="">
            <img src={LOGO} alt="" />
          </a>
        </div>

        <div className="nav-menu-lg lg-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About Us</a></li>
            {/* <li><a href="#timeline">Timeline</a></li> */}
            <li><a href="#location">Location</a></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to='/team'>Crew</Link></li>
          </ul>
        </div>

        <div className="btn-container lg-btn">
          <Button1 to="/events" />
        </div>

        <div className="mobile-nav-btn">
          <button id="toggleBtn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="nav-menu" aria-label="Toggle navigation menu">
            <FaBars className="hamburger" />
          </button>
        </div>
      </div>

      <div id="nav-menu" className={`sm-menu ${open ? "open" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About Us</a></li>
          {/* <li><a href="#timeline">Timeline</a></li> */}
          <li><a href="#location">Location</a></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to='/team'>Crew</Link></li>
        </ul>
      </div>
      <ScrollProgress />
    </>
  );
}