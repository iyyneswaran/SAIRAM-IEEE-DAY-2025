import "../../styles/global.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Button1() {
    return (
        <Link to="/events">
            <button className="Btn1">
                Register Now
                <FaArrowRight className="arrow" />
            </button>
        </Link>
    );
};