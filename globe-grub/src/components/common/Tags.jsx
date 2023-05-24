import { Link } from "react-router-dom";
import { urlParameters, cuisineFilters, mealTypeFilters, dietFilters, intoleranceFilters, maxReadyTimeFilters } from "../../internal_data/filterArrays";
import { useSearchResult } from "../../hooks/useSearchResult";
import { useResultsToShow } from "../../hooks/useResultsToShow";
import { shallow } from "zustand/shallow";
import * as apiSearchFunctions from "../../modules/apiSearchFunctions";
import { apiKey } from "../../internal_data/apiKey";
import "./tags.css";

// komponent för taggarna som finns på RecipeCard och RecipePage
export default function Tags(props) {
    //key som hamnar i url
    const key = apiKey;
    
    //setta sökresultat
    const [searchResult, setSearchResult] = useSearchResult((state) =>
        [state.searchResult, state.setSearchResult], shallow);
    //Setta sök/filter titel
    const [title, setTitle] = useSearchResult((state) =>
        [state.title, state.setTitle], shallow);
    //ange mängd som ska visas "showmore"
    const [resultsToShow, setResultsToShow] = useResultsToShow((state) =>
        [state.resultsToShow, state.setResultsToShow], shallow);

    //sammanställer alla filterkategorier med namn & värden i en array
    //för att kunna matcha och skapa URL-sträng för sökning
    let tagArray = cuisineFilters;
    tagArray = tagArray.concat(mealTypeFilters);
    tagArray = tagArray.concat(dietFilters);
    tagArray = tagArray.concat(intoleranceFilters);
    tagArray = tagArray.concat(maxReadyTimeFilters);

    //generera taggar från props-värdena på receptet
    const GenerateTags = () => {
        let time = props.time;
        let cuisines = props.cuisines;
        let diets = props.diets;
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

    //generera värden för taggar (så värdet blir en sträng redo för att användas till API:et)
    //matchar taggnamnen med värden från arrayen med alla filter (namn & värden)
    const GenerateTagValues = () => {
        let tagValues = ["", "", ""];

        tags.forEach(function (tag, index) {
            tagArray.forEach(filter => {
                if (tag == filter.tagValue || tag == filter.value || tag == filter.name) {
                    let newTag = "";
                    switch (filter.type) {
                        case "C":
                            newTag = urlParameters[0];
                            break;

                        case "D":
                            newTag = urlParameters[1];
                            break;

                        case "T":
                            newTag = urlParameters[2];
                            break;

                        case "M":
                            newTag = urlParameters[3];
                            break;

                        case "I":
                            newTag = urlParameters[4];
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

    //gör en sökning när man klickat på en tagg (endast på receptsidan)
    const searchByTagValue = async (tag) => {
        console.log("tag clicked: " + tag);
        let fetchedData = await apiSearchFunctions.fetchRecipes(key, tag);
        // console.log("tag:");
        console.log(fetchedData[0]);
        setResultsToShow(8);
        setSearchResult(fetchedData[0]);
        //justerar tag-värdet för att kunna sätta titel på sökresultatet
        setTitle(apiSearchFunctions.manipulateTitle("", tag));
    }

    return (
        <>
            {props.clickable ?
                // taggar på receptsidan
                <>
                    <Link to="/" className="tag tag-clickable color-tag-one text-color-primary" onClick={() => searchByTagValue(tagValues[0])}>{tags[0].toUpperCase()} MIN</Link>
                    <Link to="/" className="tag tag-clickable color-tag-two text-color-primary" onClick={() => searchByTagValue(tagValues[1])}>{tags[1] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[1].toUpperCase()}</Link>
                    <Link to="/" className="tag tag-clickable color-tag-three text-color-primary" onClick={() => searchByTagValue(tagValues[2])}>{tags[2] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[2].toUpperCase()}</Link>
                </>
                // taggar på receptkorten
                : <>
                    <p className="tag color-tag-one text-color-primary">{tags[0]} MIN</p>
                    <p className="tag color-tag-two text-color-primary">{tags[1] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[1].toUpperCase()}</p>
                    <p className="tag color-tag-three text-color-primary">{tags[2] == "lacto ovo vegetarian" ? "LACTO OVO" : tags[2].toUpperCase()}</p>
                </>
            }
        </>
    )
}