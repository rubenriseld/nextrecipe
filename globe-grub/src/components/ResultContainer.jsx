import RecipeCard from "./RecipeCard";

export default function ResultContainer(props) {
  return (
    <section className="result-container max-width-container">
      <h1></h1>
      <div className="recipe-card-container">
        {props.data.map((recipe) => {
          return <RecipeCard title={recipe.title} image={recipe.image} />;
        })}
      </div>
    </section>
  );
}
