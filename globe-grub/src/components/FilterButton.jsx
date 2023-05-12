import { useState } from "react";
import { useChosenFilterAmount } from "../hooks/useChosenFilterAmount";

export function FilterButton(props){
    const [isActive, setIsActive] = useState(props.active);
    const plusOneChosenFilter = useChosenFilterAmount(state => state.plusOneChosenFilter);
    const chosenFilters = useChosenFilterAmount(state => state.chosenFilters);
    const name = props.name;
    const value = props.value;
    const type = props.type;
    return(
        <button
            className={`filter-btn ${isActive?"text-color-light active-btn": "text-color-primary "}`}
            value={value}
            data-type={type}
            onClick={()=> {setIsActive(!isActive);
                isActive ? plusOneChosenFilter(chosenFilters-1): plusOneChosenFilter(chosenFilters+1);}}>
            {name}
        </button>
    )
}