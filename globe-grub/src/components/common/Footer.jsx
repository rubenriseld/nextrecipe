import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "./footer.css";


// komponent för footern
export default function Footer() {
    return (
        <footer>
            <div className="max-width-container flex flex-separate footer-container">
                <section className="">
                    <NavLink className="logo-link" to="/">
                        <Logo sloganVisible={true} />
                    </NavLink>
                </section>
                <section className="footer-info-section">
                    <a href="mailto:info@globegrub.com" className="text-color-primary">globegrub@info.com</a>
                    <p className="text-color-primary">123 456 789</p>
                    <p className="text-color-primary">Trekantsvägen 1, 117 43 Stockholm, Sweden</p>
                </section>
            </div>
        </footer>
    )
}