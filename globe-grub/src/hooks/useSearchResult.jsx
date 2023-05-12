import { create } from "zustand"
//Data från search, geo och map hamnar här och hämtas härifrån
export const useSearchResult = create((set) => ({
    searchResult: [],
    title: "",
    setSearchResult: (newSearchResult) =>
        set(() => ({ searchResult: newSearchResult })),
    setTitle: (newTitle) =>
        set(() => ({ title: newTitle }))
}));