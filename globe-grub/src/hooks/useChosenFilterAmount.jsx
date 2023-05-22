import {create} from "zustand"

//hook för att lagra antalen valda filter i filtermenyn
export const useChosenFilterAmount = create((set)=> ({
    chosenFilters: 0,
    plusOneChosenFilter: (newChosenFilters) => set(() => ({chosenFilters: newChosenFilters})),
    minusOneChosenFilter: () => set(state => ({chosenFilters: state.chosenFilters - 1})),
    clearChosenFilter: () => set(state =>({chosenFilters: state.chosenFilters = 0}) ),
}));