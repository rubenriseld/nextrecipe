import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Footer(){
    
    return(
        <footer>
            <div className="max-width-container flex flex-separate">
                <section className="flex-left">

                <NavLink className="logo-link" to="/">
          <Logo />
        </NavLink>
                    {/* <!-- LOGO COMPONENT --> */}
                    {/* <h2 className="company-name text-color-primary">GLOBE GRUB</h2>
                    <p className="slogan text-color-primary">slogan</p> */}
                    {/* <!-- END OF LOGO COMPONENT --> */}

                </section>
                <section className="flex-right footer-info-section">
                    <p className="text-color-primary">About:</p>
                    <a href="mailto:globegrub@info.com" className="text-color-pri1mary">globegrub@info.com</a>
                    <p className="text-color-primary">Trekantsvägen 1, 117 43 Stockholm, Sweden</p>
                </section>
            </div>
        </footer>
    )
}
