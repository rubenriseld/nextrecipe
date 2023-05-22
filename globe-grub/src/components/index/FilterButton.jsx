import { useState } from "react";
import { useChosenFilterAmount } from "../../hooks/useChosenFilterAmount";
import "./filterbutton.css";
// komponent för filterknapparna i filtermenyn
export default function FilterButton(props) {

    // om en filterknapp togglas så ändras färgen så det är tydligt
    // att den är aktiv
    const [isActive, setIsActive] = useState(props.active);
    const plusOneChosenFilter = useChosenFilterAmount(state => state.plusOneChosenFilter);
    const chosenFilters = useChosenFilterAmount(state => state.chosenFilters);
    //data som används för att lägga in och plocka ut värden från knapparna
    const name = props.name;
    const value = props.value;
    const type = props.type;
    return (
        <button
            className={`filter-btn ${isActive ? "text-color-light active-btn" : "text-color-primary "}`}
            value={value}
            data-type={type}
            onClick={() => {
                setIsActive(!isActive);
                isActive ? plusOneChosenFilter(chosenFilters - 1) : plusOneChosenFilter(chosenFilters + 1);
            }}>
            {name}
        </button>
    )
}