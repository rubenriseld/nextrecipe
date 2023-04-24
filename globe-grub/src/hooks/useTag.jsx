import {create} from "zustand"
// import {persist} from "zustand/middleware"


export const useTag = create((set)=> ({
    tag: "default",

    setTag: (newTag) => 
        set(() => ({tag: newTag})),

    removeTag: () => 
        set({tag: ""}),
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