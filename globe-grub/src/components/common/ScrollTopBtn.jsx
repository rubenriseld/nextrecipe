import { useState, useEffect } from "react";
import "./scrolltopbtn.css";

//knapp för att gå tillbaka till toppen av sidan
export default function ScrollTopBtn() {
    const [visible, setVisible] = useState(false)

    //om användaren scrollar längre ner än angiven siffra visas knappen
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        });
    }, []);

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return(
        <button className={`go-to-top-btn color-primary ${visible ? "" : 'hide-go-to-top'}`} onClick={scrollToTop}>
            <i className="fa-solid fa-chevron-up go-to-top-icon text-color-light"></i>
        </button>
    )
}