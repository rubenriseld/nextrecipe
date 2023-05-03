import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import { shallow } from "zustand/shallow";
import ResultContainer from "./ResultContainer";

export default function Geo(){
  const [status, setStatus] = useState(null);
  const [searchResult, setSearchResult] = useSearchResult(
    (state) => [state.searchResult, state.setSearchResult],
    shallow
  );
  const [title, setTitle]= useSearchResult((state)=>
      [state.title, state.setTitle],shallow);
  let cuisine = [];
  let results = [];
   
  const key1 = "13c6c14454a748769e3611a7cf719862";
  const key2 = "74c179cdd6bf42fab75869c258580b05";
  const key3 = "c02162ede9394dd8bca983829213bd71";
  const key4 = "85ce5287879e42978484fcf300dace17";
  const key5 = "8fbd9413e79a49bfaa909d68f22e0476";
  const key6 = "ce46b5aef3da4d67b273b1b7dec8567f";
  const key7 = "15c980413ad44f09ba2ac7e73f076610";
  const key8 = "e50fb6304553492781cba43da8b4bc7f";
  const key9 = "32603e2291624b4689643c2428fbe5f1";
  const key10 = "7e4ba385c74c4c0595bbb872618f7fc2";
  const key11 = "9c18433a167642f1a942f5b66f28a73e";
  const key12 = "7d22a6b4acf44702bdd65c55ce0b9290";
  const key13 = "44494a778e8c447a857f4b735fbc22cd";
  const key14 = "86a723f2dd0a43d2b53affefcab429de";

    const getLocation = () => {
       if (!navigator.geolocation) {
           setStatus("Geolocation is not supported by your browser!");
           } 
       else {
                
       setStatus("Loading...");
           }
           navigator.geolocation.getCurrentPosition(
           (position) => {
           setStatus(null);
           getCountry(position.coords.latitude, position.coords.longitude);
           },
           () => {
           setStatus("Unable to retrieve your location");
               }   
           );  
       };

       const getCountry = (x, y) => {
        const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${x},${y}&lang=en-US&apiKey=xJgXFjeLZ4yfhudR_y61uPrN315wNvFoaWitAQHeKpc`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.items.map((x) =>{
                getCuisine(x.address.countryName);
            })
        })
       };

       const getCuisine = (currentCountry) => {

         const countries = [
        {id: 'thai', value: 'Thailand'},
        {id: 'british', value: 'United Kingdom'},
        {id: 'american', value: 'United States'},
        {id: 'cajun', value: 'United States'},
        {id: 'chinese', value: 'China'},
        {id: 'vietnamese', value: 'Vietnam'},
        {id: 'french', value: 'France'},
        {id: 'german', value: 'Germany'},
        {id: 'greek', value: 'Greece'},
        {id: 'indian', value: 'India'},
        {id: 'irish', value: 'Ireland'},
        {id: 'italian', value: 'Italy'},
        {id: 'japanese', value: 'Japan'},
        {id: 'korean', value: 'South Korea'},
        {id: 'mexican', value: 'Mexico'},
        {id: 'southern', value: 'United States'},
        {id: 'spanish', value: 'Spain'},
        {id: 'nordic', value: ['Denmark', 'Norway', 'Sweden', 'Finland', 'Iceland', 'Faraoe Islands', 'Greenland', 'Åland']},
        {id: 'middle-eastern', value: ['Bahrain', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Palestine', 'Qatar', 'Saudi Arabia', 'Syria', 'Turkey', 'United Arab Emirates', 'Yemen']},
        {id: 'mediterranean', value: [ 'Albania', 'Bosnia and Herzegovina', 'Gibraltar', 'Algeria', 'Morocco', 'France', 'Croatia', 'Montenegro', 'Cyprus', 'North Cyprus Turkish Republic', 'Libya', 'Lebanon', 'Egypt', 'Malta', 'Monaco', 'Slovenia', 'Syria', 'Tunisia', 'Turkey', 'Vatican City', 'Greece', 'Spain', 'Israel', 'Italy']},
        {id: 'latin-american', value: [ 'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'the Dominican Republic', 'Uruguay']},
        {id: 'jewish', value: ['Israel', 'United States']},
        {id: 'caribbean', value: ['Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Dominica', 'Grenada', 'Guyana', 'Haiti', 'Jamaica', 'Montserrat', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Suriname', 'Trinidad and Tobago']},
        {id: 'eastern-european', value: ['Albania', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'the Czech Republic', 'Estonia', 'Hungary', 'Kosovo', 'Latvia', 'Lithuania', 'the Republic of North Macedonia', 'Moldova', 'Montenegro', 'Poland', 'Romania', 'Serbia', 'Slovakia', 'Slovenia', 'Ukraine']},
        {id: 'african', value: ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon','Central African Republic','Chad','Comoros','Democratic Republic of the Congo','Republic of the Congo','Cote d\'Ivoire','Djibouti','Egypt','Equatorial Guinea','Eritrea','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','Sao Tome and Principe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Swaziland','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe']},
        {id: 'european', value:['Albania','Andorra','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Iceland','Ireland','Italy','Kazakhstan','Kosovo','Latvia','Liechtenstein','Lithuania','Luxembourg','Macedonia','Malta','Moldova','Monaco','Montenegro','Netherlands','Norway','Poland','Portugal','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Turkey','Ukraine','United Kingdom','Vatican City']},
        {id: 'asian', value: ['Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei', 'Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran','Iraq','Israel', 'Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestine','Philippines','Qatar','Russia','Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor Leste','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan','Vietnam','Yemen']}];   
  
        for (const x of countries){
          if(currentCountry == x.value){
            cuisine.push(x.id);
          }
          else{
            if (Array.isArray(x.value) == true){
              x.value.forEach(i => {
                if (currentCountry == i){
                  cuisine.push(x.id);
                }
              })
            }
          }
        }
      fetchCuisine(cuisine);

      setTitle(cuisine);
      
      };

      const fetchCuisine = async (x) => {
        var url = "";
         try {
          if (Array.isArray(x) == true){
            for (const y of x){
              url = `https://api.spoonacular.com/recipes/random?number=15&tags=${y}&apiKey=${key13}`;  
           await fetch(url)
           .then((response) => response.json())
           .then((data) => {
            for (const x of data.recipes){
              results.push(x);
            }
           })
            }
          }else{
            url = `https://api.spoonacular.com/recipes/random?number=15&tags=${x}&apiKey=${key13}`;  
           await fetch(url)
           .then((response) => response.json())
           .then((data) => {
              results.push(data);
           })
          }
        } catch (e) {
          console.log(e);
        }
        setSearchResult(results);
        console.log(results);
      }
      
      return(
        <div className="geo-container">
            <NavLink to="/" type="button" className="geo-btn color-accent" onClick={getLocation}>
                <i className="fa-solid fa-location-dot geo-icon"></i>
            </NavLink>
            <p className="geo-text">Find Recipes matching your region!</p>
        </div>
    );
}
