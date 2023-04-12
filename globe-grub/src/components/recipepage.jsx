
export default function RecipePage({title}) {
    return (
// <!-- RECIPE PAGE COMPONENT -->
<div class="flex-center">
    <section class="max-width-container">
        {/* <!-- Receptnamn --> */}
        <h1 class="recipe-title">{title}</h1>


        <article class="recipe-container">
            <div class="recipe-visual-container">
                {/* <!-- Bild på maten --> */}
                <div>
                    <img class="recipe-image mr-4 ml-4" src="img/chickckckcn.png" />
                </div>
                {/* <!-- Taggar och stjärnor --> */}
                <div class="flex flex-separate align-items-center">
                    {/* <!-- Taggar --> */}
                    <div class="flex tag-container">
                        
                        {/* <!--  ----   TAG COMPONENTS ---- --> */}
                        {/* <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                            kommer vi ha tre tagg-komponenter
                         --> */}
                        <p class="tag color-secondary">20 min</p>
                        <p class="tag color-secondary">asia</p>
                        <p class="tag color-secondary">vegan</p>
                        {/* <!-- END OF TAG COMPONENTS --> */}

                    </div>
                    
                    {/* <!-- Stjärnor --> */}
                    <div class="flex">
                        {/* <!-- STAR/RATING COMPONENT --> */}
                    </div>

                </div>
            </div>
            <div class="recipe-ingredients">
                {/* <!-- (antalet portioner) --> */}
                <h2 class="ingredients-title">Ingredients for 4 portions</h2>
                {/* <!-- Ingrediensmått och ingredienser  --> */}
                <div class="flex">
                    {/* <!-- Ingrediensmått --> */}
                    <div class="flex flex-column">
                        <p class="ingredient">2 cloves</p>
                        <p class="ingredient">2 tbsp</p>
                        <p class="ingredient">1.7 kg</p>
                        <p class="ingredient">50 mg</p>
                        <p class="ingredient">6 pcs</p>
                        <p class="ingredient">A little</p>
                    </div>
                    {/* <!-- Ingredienser --> */}
                    <div class="flex flex-column">
                        <p class="ingredient">Garlic</p>
                        <p class="ingredient">Olive Oil</p>
                        <p class="ingredient">Chicken</p>
                        <p class="ingredient">Butter</p>
                        <p class="ingredient">Potatoes</p>
                        <p class="ingredient">Sea Salt</p>
                    </div>
                </div>
            </div>

            <div class="recipe-instructions">
                {/* CHECKBOX COMPONENTS */}
            </div>

        </article>

    </section>
</div>
    )
}