import { useState } from "react";

// komponent för checkboxar på receptsidan
export default function Checkbox(props) {

    // om en checkbox är iklickad kommer tillhörande text bli överstruken 
    // och grå, för att markera att steget är slutfört
    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="flex checkbox-container">
            <input
                type="checkbox"
                className="checkbox"
                checked={isChecked}
                onChange={handleOnChange} />
            <p className={`instruction ${isChecked ? "linethrough" : ""}`}>
                {props.number}. {props.step}
            </p>
        </div>
    );
}