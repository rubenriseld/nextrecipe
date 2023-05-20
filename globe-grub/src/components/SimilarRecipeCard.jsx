import {Link} from "react-router-dom"

export default function SimilarRecipeCard(props) {
    return (
        <article className="recipe-card">
        <Link to={`/recipe/${props.id}`} state={props.id}>
            {/* <img src={props.image} onError={handleImageError} /> */}
         
            <div className="recipe-card-info">
                <h3 className="recipe-card-title text-color-primary">{props.title}</h3>
            </div>
        </Link>
    </article>
    )
}