import { useState } from "react";

export function FilterButton(props){
    const [isActive, setIsActive] = useState(props.active);

    const name = props.name;
    const value = props.value;
    const type = props.type;

    return(
        <button
            className={`test-btn ${isActive?"active-btn": ""}`}
            value={value}
            data-type={type}
            onClick={()=> {setIsActive(!isActive);}}>
            {name}
        </button>
    )
}