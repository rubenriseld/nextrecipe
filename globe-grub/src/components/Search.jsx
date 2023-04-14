
export default function Search({childToParent}){
    const data = ["Found 173 recipes"];

    return(
        <div className="searchbar-container color-secondary">
            <input className="searchbar" type="search" name="queryvalue" value="search.." />
            <button type="button" className="search-btn color-primary" onClick={()=>childToParent(data)}>
                <i className="fa-solid fa-sliders slider-icon"></i>
               {/*room for filtermenu component */}
            </button>
        </div>
    )
}
