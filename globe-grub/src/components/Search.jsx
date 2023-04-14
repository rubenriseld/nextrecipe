
export default function Search({childToParent}){
    const data = ["Found 173 recipes"];

    return(
        <div className="searchbar-container color-secondary">
            <input className="searchbar" type="search" name="queryvalue" value="search.." />

                {/* lägga in resultat från api-anrop in i data 
                och skicka det genom childToParent-funktionen här 
                
                kommer då finnas tillgänglig i IndexPage-komponenten
                så vi kan mata in det till en ResultContainer på nåt sätt

                lär väl behövas ett props-attribut som man slänger in i 
                ResultContainer, och sen en funktion där i för att generera
                ReceptKort baserat på propsen typ
                */}

            <button type="button" className="search-btn color-primary" onClick={()=>childToParent(data)}>
            
            
                <i className="fa-solid fa-sliders slider-icon"></i>
               {/*room for filtermenu component */}
            </button>
        </div>
    )
}
