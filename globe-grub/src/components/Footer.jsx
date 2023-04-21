
export default function Footer(){
    
    return(
        <footer>
            <div className="max-width-container flex flex-separate">
                <section className="flex-left">

                    {/* <!-- LOGO COMPONENT --> */}
                    <h2 className="company-name text-color-primary">GLOBE GRUB</h2>
                    <p className="slogan text-color-primary">slogan</p>
                    {/* <!-- END OF LOGO COMPONENT --> */}

                </section>
                <section className="flex-right footer-info-section">
                    <p className="text-color-primary">info</p>
                    <p className="text-color-primary">info</p>
                    <p className="text-color-primary">info</p>
                </section>
            </div>
        </footer>
    )
}
