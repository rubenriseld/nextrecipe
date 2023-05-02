import { useState, useEffect } from "react";
import { FaAngleUp } from 'react-icons/fa';

export default function ScrollTopBtn() {
    const [visible, setVisible] = useState(false)

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
        <div>
        <button className={`top-to-btm" ${visible ? "" : 'scroll-show'}`}>
            <FaAngleUp className="icon-position icon-style" onClick={scrollToTop} />        
        </button>
        </div>
    )
}