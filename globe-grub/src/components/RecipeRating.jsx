
export default function RecipeRating({likes}){
    return(
        <p className="text-color-primary like-number"><i class="fa-regular fa-heart like-icon text-color-accent"></i> {likes}</p>

        // <div className="flex">
            
        //     <p className="star text-color-secondary">&#9733;</p>
        //     <p className="star text-color-secondary">&#9733;</p>
        //     <p className="star text-color-secondary">&#9733;</p>
        //     <p className="star text-color-secondary">&#9733;</p>
        //     <p className="star text-color-secondary">&#9734;</p>

        // </div>

    )
}