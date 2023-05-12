import { useState } from "react";

// komponent för filterknapparna i filtermenyn
export function FilterButton(props){
    
    // om en filterknapp togglas så ändras färgen så det är tydligt
    // att den är aktiv
    const [isActive, setIsActive] = useState(props.active);
    
    const name = props.name;
    const value = props.value;
    const type = props.type;

    return(
        <button
            className={`filter-btn ${isActive?"text-color-light active-btn": "text-color-primary "}`}
            value={value}
            data-type={type}
            onClick={()=> {setIsActive(!isActive);}}>
            {name}
        </button>
    )
}