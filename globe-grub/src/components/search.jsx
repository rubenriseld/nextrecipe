
export default function Search(){
    return(
        <div className="searchbar-container color-secondary">
            <input className="searchbar" type="search" name="queryvalue" value="search.." />
            <button type="button" className="search-btn color-primary">
                <i className="fa-solid fa-sliders slider-icon"></i>
               {/*room for filtermenu component */}
            </button>
        </div>
    )
}