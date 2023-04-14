import { useState } from "react";

export default function Checkbox(){
    const [isChecked, setIsChecked] = useState(false);
    
    const handleOnChange = () => {
        setIsChecked(!isChecked);
      };

    return(
        <div class="flex checkbox-container">
            <input 
            type="checkbox" 
            class="checkbox" 
            checked={isChecked} 
            onChange={handleOnChange} />
                <p className={`instruction ${isChecked ? "linethrough": ""}`}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                 eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
         </div>
    )
}

