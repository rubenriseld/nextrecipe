import { useLocation, Link } from "react-router-dom";

export default function AboutUs(){

    return(
        <>
        <div className="max-width-container">
            <h2 className="headline flex flex-center" placeholder="">This is GlobeGrub</h2>
            <p className="company-text flex flex-center">Your food journey around the world starts here.</p>
            <section className="vision-container flex flex-column align-items-center">
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
                        <p className="role-description">Role: Product Owner</p>
                        <p>Meet Anna, a swedish project leader..</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png"/>
                        <p className="role-description">Role: Scrum Master</p>
                        <p>Meet Anuja, a swedish project leader..</p>
                    </section>
                {/* </div> */}
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p className="role-description">Role: Developer</p>
                        <p>Meet Joakim, a swedish developer..</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p className="role-description">Role: Developer</p>
                        <p>Meet Ruben, a swedish developer..</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p className="role-description">Role: Developer</p>
                        <p>Meet Neliz, a swedish developer..</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p className="role-description">Role: Developer</p>
                        <p>Meet Christofer, a swedish developer..</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p className="role-description">Role: Developer</p>
                        <p>Meet Karl, a swedish developer..</p>
                    </section>
                    <section className="staff-box">
                        <img className="profile-pic" src="/images/PlaceholderProfile.png" />
                        <p className="role-description">Role: Developer</p>
                        <p>Meet Tove, a swedish developer..</p>
                    </section>         
                </div>
            </section>
        </div>
        </>
    )
}
