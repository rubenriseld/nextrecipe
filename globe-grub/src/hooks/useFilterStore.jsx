import {create} from 'zustand';
//hook för att hämta api-parametrar för filters
export const useFilterStore = create (()=> (
    {
        cuisine: "&cuisine=", 
        diet: "&diet=", 
        maxReadyTime: "&maxReadyTime=", 
        type:"&type=", 
        intolerances: "&intolerances=", 
    }
))
