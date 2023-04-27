import {create} from 'zustand';

export const useFilterStore = create ((set, get)=> (
    {
        cuisine: "&cuisine=", 
        diet: "&diet=", 
        maxReadyTime: "&maxReadyTime=", 
        type:"&type=", 
        intolerances: "&intolerances=", 
    }
))
