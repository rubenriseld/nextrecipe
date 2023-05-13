import {create} from "zustand"


export const useChosenFilterAmount = create((set)=> ({
    chosenFilters: 0,
    plusOneChosenFilter: (newChosenFilters) => 
    set(() => ({chosenFilters: newChosenFilters})),

    
    minusOneChosenFilter: () => set(state => ({chosenFilters: state.chosenFilters - 1})),
    clearChosenFilter: () => set(state =>({chosenFilters: state.chosenFilters = 0}) ),
}));