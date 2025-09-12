import "../../styles/global.css"
import { FaArrowRight } from "react-icons/fa";

export default function Button2() {
    return (
        <>
            <a href="#about">
                <button className="Btn1 Btn2">
                    About Us
                    <FaArrowRight className="arrow" />
                </button>
            </a>
        </>
    );
};