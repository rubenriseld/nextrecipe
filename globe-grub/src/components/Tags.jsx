import { Link } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import { useTag } from "../hooks/useTag";
import { useFilterStore } from "../hooks/useFilterStore";

import { CuisineFilters, MealTypeFilters, DietFilters, IntoleranceFilters, TimeFilters } from "./FilterItems";

export default function Tags(props){
    // const clickable = props.clickable;
    const [SearchResult, setSearchResult] = useSearchResult(
        (state) => [state.SearchResult, state.setSearchResult],
        shallow
      );
    const [tag, setTag] = useTag(
        (state) => [state.tag, state.setTag],
        shallow     
        );
        const filterString = useFilterStore.getState((state) => state);

        let tagArray = CuisineFilters;
        tagArray = tagArray.concat(MealTypeFilters);
        tagArray = tagArray.concat(DietFilters);
        tagArray = tagArray.concat(IntoleranceFilters);
        tagArray = tagArray.concat(TimeFilters);
        
        // console.log(tagArray)
        // tagArray.forEach(element => {
        //     console.log(element.name);
        // });

    const GenerateTags = () => {
        let time = props.time;
        let cuisines = props.cuisines;
        let diets = props.diets;
        let dishTypes = props.dishTypes;
        let vegan = props.vegan;
        let vegetarian = props.vegetarian;

        let tags = ["zero", "one", "two"];
        // let tagStrings = ["zero", "one", "two"];
        
        //tag one
        if(time != null){ 
            tags[0] = time; 
        } else { 
            tags[0] = "45"; //default om det inte finns tid på receptet, skulle kunna bytas ut till 
                            //annat värde om det saknas på många
        }

        //tag two
        if(cuisines.length != 0) {
            tags[1] = cuisines[0];
            // tagStrings[1] = "&cuisine="
        } else { //om region saknas på receptet
            if(vegan == true ){
                tags[1] = "vegan"; //slänger in "vegan" om den e true
                
            } else {
                if(vegetarian == true){
                    tags[1] = "vegetarian";
                }else{
                    if(diets.length > 1 ){
                        tags[1] = diets[1]; //tar andra värdet i diets som tagg nr två ifall 
                        //det saknas region & receptet inte e veganskt
                    } else {
                        if(dishTypes.length != 0){
                        tags[1] = dishTypes[0]; //tar första värdet i dishTypes (typ lunch, middag etc) om 
                        //det saknas region, vegan elr andra diet
                        } else {
                            tags[1] = "meat";       //något defaultvärde ifall det inte finns ett skit
                                                    //"meat" just nu om den inte e vegansk eller vegetarisk
                        }
                    }
                }
            }
        }

        //tag three 
        if(diets.length != 0){
            tags[2] = diets[0];
        }else{
            if(dishTypes.length > 1){
                tags[2] = dishTypes[1]; //om diet saknas ta andra dishTypen
            } else {
                tags[2] = "food"; //något defaultvärde ifall det inte finns ett skit
            }
        }    
        console.log(tags);  
        return tags;
    }

    const GenerateTagValues = () => {
        let tagValues = ["","",""];

        tags.forEach(function(tag, index){
            tagArray.forEach(filter => {
               if(tag == filter.tagValue || tag == filter.value){
                let newTag = "";
                switch(filter.type){
                        case "C":
                            newTag = filterString.cuisine;
                        break;

                        case "I":
                            newTag = filterString.Intolerances;
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
        // tags
        return tagValues;
    }
    let tags = GenerateTags();
    let tagValues = GenerateTagValues();
    return(
        <>
            {props.clickable ? 
                <>
                    <Link to="/" className="tag color-tag-one text-color-primary" onClick={() => {setSearchResult([]); setTag(tagValues[0])}}>{tags[0]} min</Link>
                    <Link to="/" className="tag color-tag-two text-color-primary"  onClick={() => {setSearchResult([]); setTag(tagValues[1])}}>{tags[1] == "lacto ovo vegetarian" ? "lacto ovo" : tags[1]}</Link>
                    <Link to="/" className="tag color-tag-three text-color-primary"  onClick={() => {setSearchResult([]); setTag(tagValues[2])}}>{tags[2] == "lacto ovo vegetarian" ? "lacto ovo" : tags[2]}</Link>
                </>
                :<>
                    <p className="tag color-tag-one text-color-primary">{tags[0]} min</p>
                    <p className="tag color-tag-two text-color-primary">{tags[1] == "lacto ovo vegetarian" ? "lacto ovo" : tags[1]}</p>
                    <p className="tag color-tag-three text-color-primary">{tags[2] == "lacto ovo vegetarian" ? "lacto ovo" : tags[2]}</p>
                </> 
                }
                               
                                              {/* byta ut strängen så den blir kortare om de e den här långa           */}
            
        </>
    )
}