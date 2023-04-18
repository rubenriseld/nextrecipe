import {create} from 'zustand';




export const useFilterStore = create ((set, get)=> (
    {
        cuisine: "&cuisine=", 
        diet: "&diet=", 
        maxReadyTime: "&maxReadyTime=", 
        type:"&type=", 
        intolarences: "&intolerances=", 
        
        updateCuisine: (data) => {
           const current = get().diet
           set({cuisine: current + data}) 
        }
    }
))
