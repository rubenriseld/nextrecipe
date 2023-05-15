import { Link } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useTag } from "../hooks/useTag";
import { useFilterStore } from "../hooks/useFilterStore";
import ApiSearchFunction from "./ApiSearchFunction";
import { CuisineFilters, MealTypeFilters, DietFilters, IntoleranceFilters, TimeFilters } from "./FilterArrays";

// komponent för taggarna som finns på RecipeCard och RecipePage
export default function Tags(props) {
    const [SearchResult, setSearchResult] = useSearchResult(
        (state) => [state.SearchResult, state.setSearchResult],
        shallow
    );
    const [tag, setTag] = useTag(
        (state) => [state.tag, state.setTag],
        shallow
    );
    const filterString = useFilterStore.getState((state) => state);
    const redirectToApiSearchFunction = ApiSearchFunction();

    let tagArray = CuisineFilters;
    tagArray = tagArray.concat(MealTypeFilters);
    tagArray = tagArray.concat(DietFilters);
    tagArray = tagArray.concat(IntoleranceFilters);
    tagArray = tagArray.concat(TimeFilters);

    const GenerateTags = () => {
        let time = props.time;
        console.log(time)
        let cuisines = props.cuisines;
        console.log(cuisines)
        let diets = props.diets;
        console.log(diets)
        let dishTypes = props.dishTypes;
        let vegan = props.vegan;
        let vegetarian = props.vegetarian;

        let tags = ["zero", "one", "two"];

        //tag one
        if (time != null) {
            tags[0] = time;
        } else {
            //default om det inte finns tid på receptet, skulle kunna bytas ut till 
            //annat värde om det saknas på många
            tags[0] = "45";
        }

        //tag two
        if (cuisines.length != 0) {
            tags[1] = cuisines[0];
            //om region saknas på receptet
        } else {
            // slänger in "vegan" om den e true
            if (vegan == true) {
                tags[1] = "vegan";

            } else {
                if (vegetarian == true) {
                    tags[1] = "vegetarian";
                } else {
                    // tar andra värdet i diets som tagg nr två ifall 
                    // det saknas region & receptet inte e veganskt
                    if (diets.length > 1) {
                        tags[1] = diets[1];
                    } else {
                        // tar första värdet i dishTypes (typ lunch, middag etc) om 
                        // det saknas region, vegan elr andra diet
                        if (dishTypes.length != 0) {
                            tags[1] = dishTypes[0];
                        } else {
                            // något defaultvärde ifall det inte finns ett skit
                            // "meat" just nu om den inte e vegansk eller vegetarisk
                            tags[1] = "meat";
                        }
                    }
                }
            }
        }

        // tag three 
        if (diets.length != 0) {
            tags[2] = diets[0];
        } else {
            if (dishTypes.length > 1) {
                // om diet saknas ta andra dishTypen
                tags[2] = dishTypes[1];
            } else {
                // något defaultvärde ifall det inte finns ett skit
                tags[2] = "food";
            }
        }
        return tags;
    }

    const GenerateTagValues = () => {
        let tagValues = ["", "", ""];

        tags.forEach(function (tag, index) {
            tagArray.forEach(filter => {
                if (tag == filter.tagValue || tag == filter.value || tag == filter.name) {
                    let newTag = "";
                    switch (filter.type) {
                        case "C":
                            newTag = filterString.cuisine;
                            break;

                        case "I":
                            newTag = filterString.intolerances;
                            break;

                        case "D":
                            newTag = filterString.diet;
                            break;

                        case "M":
                            newTag = filterString.type;
                            break;

                        case "T":
                            newTag = filterString.maxReadyTime;
                            break;
                    }
                    newTag += filter.value;
                    this[index] = newTag;
                }

            })
        }, tagValues);
        return tagValues;
    }
    let tags = GenerateTags();
    let tagValues = GenerateTagValues();
    return (
        <>
            {props.clickable ?
                <>
                {/*få in apisearchfunction här !! */}
                    <Link to="/" className="tag color-tag-one text-color-primary" onClick={() => { setSearchResult([]); setTag(tagValues[0]) }}>{tags[0].toUpperCase()} MIN</Link>
                    <Link to="/" className="tag color-tag-two text-color-primary" onClick={() => { setSearchResult([]); setTag(tagValues[1]) }}>{tags[1] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[1].toUpperCase()}</Link>
                    <Link to="/" className="tag color-tag-three text-color-primary" onClick={() => { setSearchResult([]); setTag(tagValues[2]) }}>{tags[2] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[2].toUpperCase()}</Link>
                </>
                : <>
                    <p className="tag color-tag-one text-color-primary">{tags[0]} MIN</p>
                    <p className="tag color-tag-two text-color-primary">{tags[1] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[1].toUpperCase()}</p>
                    <p className="tag color-tag-three text-color-primary">{tags[2] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[2].toUpperCase()}</p>
                </>
            }
        </>
    )
}