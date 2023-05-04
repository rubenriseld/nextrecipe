import {create} from "zustand"


export const useResultsToShow = create((set)=> ({
    resultsToShow: 4,

    setResultsToShow: (newResultsToShow) => 
        set(() => ({resultsToShow: newResultsToShow})),

    removeResultsToShow: () => 
        set({resultsToShow: []}),

    
}));