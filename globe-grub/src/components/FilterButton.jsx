import { useState } from "react";

export function FilterButton(props){
    const [isActive, setIsActive] = useState(props.active);

    const name = props.name;
    const value = props.value;
    const type = props.type;
    // const key = props.key;


    return(
        <button
            className={`test-btn ${isActive?"active-btn": ""}`}
            // key={key} 
            value={value}
            onClick={()=> setIsActive(!isActive)}>
            {name}
        </button>
    )
}