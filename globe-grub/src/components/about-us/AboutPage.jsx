import "./aboutpage.css";

export default function AboutUs(){

    return(
        <>
        <div className="max-width-container">
            <h2 className="headline flex flex-center" placeholder="">This is GlobeGrub</h2>
            <p className="company-text flex flex-center">Your food journey around the world starts here.</p>
            <section className="vision-container flex flex-column align-items-center ">
                <h3 className="headline flex flex-center">Our vision..</h3>
                <p className="text-block">...On a journey to the...Lorem ipsum... </p>
            {/* <article>
                <img />
                Företagsinfo gdfgfgddfgf
            </article> */}
            </section>
            <section className="meet-team-container">
                <h3 className="headline-team flex flex-center">Meet the team behind GlobeGrub</h3>
                <div className="staff-container flex-separate">
                {/* <div className="boss-container flex-center"> */}
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png"/>
                        <p>Anna</p>
                        <p className="role-description">Product Owner</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png"/>
                        <p>Anuja</p>
                        <p className="role-description">Scrum Master</p>
                    </section>
                {/* </div> */}
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p>Joakim</p>
                        <p className="role-description">Developer</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p>Ruben</p>
                        <p className="role-description">Developer</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p>Neliz</p>
                        <p className="role-description">Developer</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p>Christofer</p>
                        <p className="role-description">Developer</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p>Karl</p>
                        <p className="role-description">Developer</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p>Tove</p>
                        <p className="role-description">Developer</p>
                    </section>         
                </div>
            </section>
        </div>
        </>
    )
}
