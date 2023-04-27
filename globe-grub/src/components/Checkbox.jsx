import { useState } from "react";

export default function Checkbox(props){
    const [isChecked, setIsChecked] = useState(false);
    
    const handleOnChange = () => {
        setIsChecked(!isChecked);
      };

    return(
        <div className="flex checkbox-container">
            <input 
            type="checkbox" 
            className="checkbox" 
            checked={isChecked} 
            onChange={handleOnChange} />
                <p className={`instruction ${isChecked ? "linethrough": ""}`}>
                {props.number}. {props.step}
            </p>
         </div>
  );
}

