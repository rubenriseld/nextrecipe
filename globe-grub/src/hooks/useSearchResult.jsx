import {create} from "zustand"
// import {persist} from "zustand/middleware"


export const useSearchResult = create((set)=> ({
    searchResult: [],

    setSearchResult: (newSearchResult) => 
        set(() => ({searchResult: newSearchResult})),

    removeSearchResult: () => 
        set({searchResult: []}),
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