export default function Search(){
    return(
        <div class="searchbar-container color-secondary">
            <input class="searchbar" type="search" name="queryvalue" value="search.." />
            <button type="button" class="search-btn color-primary">
                <i class="fa-solid fa-sliders slider-icon"></i>
               {/*room for filtermenu component */}
            </button>
        </div>
    )
}