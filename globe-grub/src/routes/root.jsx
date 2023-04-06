export default function Root() {
    return(
        <>
        <section class="header">
            {/* header */}
            </section>

        <section class="geosearch">
            
            <section class="geo">
                <button class="geo-btn"></button>
                <p id="geo_p">Find Recipes matching your region!</p>
            </section>

            <section class="searchbar-container">
                <input 
                class="searchbar"
                type="search"
                name="q"
                />
                <button type="button" class="searchbar_btn">
                {/* Här ska filterknappen och popuppmenyn vara */}
                </button>
            </section>

        </section>

        <section class="footer">
            {/* footer */}
        </section>
        </>
    )
}