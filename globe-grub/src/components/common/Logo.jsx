import "./logo.css";
//komponent för loggan i header & footer
//slogan visas endast i footer
export default function Logo({ sloganVisible }) {
    return (
        <>
            <img
                src="/images/globegrub2.png"
                alt="helloes"
                className="company-logo"
            />
            <h2 className="company-name fa-solid text-color-primary">GLOBE GRUB</h2>
            {sloganVisible ?
                <p className="slogan text-color-primary">
                    when you want your globe to be grubbed
                </p>
                : <></>
            }
        </>
    );
}
