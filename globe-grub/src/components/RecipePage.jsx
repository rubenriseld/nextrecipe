import Checkbox from "./Checkbox"
import StarRating from "./StarRating"

export default function RecipePage() {
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);

  
  const location = useLocation();
  const id = location.state;

  const url =  `https://api.spoonacular.com/recipes/${id}/information?&apiKey=13c6c14454a748769e3611a7cf719862`

  useEffect(()=> {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setRecipe(data);
      console.log(recipe);
      setLoading(false);
    });
  }, []);

  if(loading){
    return <p>Loading.........</p>
  }
    return (
    // <!-- RECIPE PAGE COMPONENT -->
    <section className="max-width-container">
        {/* <!-- Receptnamn --> */}
        <h1 className="recipe-title">{title}</h1>

        <article className="recipe-container">
            <div className="recipe-visual-container">
                {/* <!-- Bild på maten --> */}
                <div>
                    <img className="recipe-image mr-4 ml-4" src="../structure/img/chickckckcn.png" />
                </div>
                {/* <!-- Taggar och stjärnor --> */}
                <div className="flex flex-separate align-items-center">
                    {/* <!-- Taggar --> */}
                    <div className="flex tag-container">
                        
                        {/* <!--  ----   TAG COMPONENTS ---- --> */}
                        {/* <!-- vi kommer göra en komponent för en enskild tagg, så på receptkorts-komponenter
                            kommer vi ha tre tagg-komponenter
                         --> */}
                        <p className="tag color-secondary">20 min</p>
                        <p className="tag color-secondary">asia</p>
                        <p className="tag color-secondary">vegan</p>
                        {/* <!-- END OF TAG COMPONENTS --> */}

                    </div>
                    
                    {/* <!-- Stjärnor --> */}
                    <div className="flex">
                        {/* <!-- STAR/RATING COMPONENT --> */}
                        <StarRating/>
                    </div>

                </div>
            </div>
            <div className="recipe-ingredients">
                {/* <!-- (antalet portioner) --> */}
                <h2 className="ingredients-title">Ingredients for 4 portions</h2>
                {/* <!-- Ingrediensmått och ingredienser  --> */}
                <div className="flex">
                    {/* <!-- Ingrediensmått --> */}
                    <div className="flex flex-column">
                        <p className="ingredient">2 cloves</p>
                        <p className="ingredient">2 tbsp</p>
                        <p className="ingredient">1.7 kg</p>
                        <p className="ingredient">50 mg</p>
                        <p className="ingredient">6 pcs</p>
                        <p className="ingredient">A little</p>
                    </div>
                    {/* <!-- Ingredienser --> */}
                    <div className="flex flex-column">
                        <p className="ingredient">Garlic</p>
                        <p className="ingredient">Olive Oil</p>
                        <p className="ingredient">Chicken</p>
                        <p className="ingredient">Butter</p>
                        <p className="ingredient">Potatoes</p>
                        <p className="ingredient">Sea Salt</p>
                    </div>
                </div>
            </div>

            <div className="recipe-instructions">
                {/* CHECKBOX COMPONENTS */}
                <Checkbox/>
                <Checkbox/>
                <Checkbox/>
                <Checkbox/>
                <Checkbox/>
            </div>
        </article>
    </section>
    )
}
