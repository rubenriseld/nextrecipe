import RecipeCard from "./recipecard"

export default function Result({title}) {
        return (
            <section className="result-container max-width-container">
                
                <h1>{title}</h1>
                <div className="recipe-card-container">
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                </div>
            </section>
        )
}