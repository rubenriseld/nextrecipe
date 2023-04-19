import {create} from "zustand"
// import {persist} from "zustand/middleware"


export const useSearchResult = create((set)=> ({
    searchResult: [],

    setSearchResult: (newSearchResult) => 
        set(() => ({searchResult: newSearchResult})),

    removeSearchResult: () => 
        set({searchResult: []}),
}));


export const useFilterStore = create((set)=> ({
    filter: "",

    setFilter: (newFilter) => 
        set(() => ({filter: filter+newFilter})),

    removeFilter: () => 
        set({filter: ""}),
}));

// export const useSearchResult = create(persist(
//     (set, get) => ({
//         result: [],
//         addResult: (result) => set((prevState)=>(
//             {result: [...prevState.result, result]}
//         ))
//     }),
//     {
//         name: "search-result",
//         getResult: () => sessionStorage,
//     }
// ))