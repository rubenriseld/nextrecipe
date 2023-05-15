import {create} from "zustand"
//Antal fler recept som ska visas när "show more" klickas efter en sökning
export const useResultsToShow = create((set)=> ({
    resultsToShow: 8,
    setResultsToShow: (newResultsToShow) => 
        set(() => ({resultsToShow: newResultsToShow})),
}));