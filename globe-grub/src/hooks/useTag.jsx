import {create} from "zustand"

// state för att kunna göra sökning när man klickar på taggar i recipepage
export const useTag = create((set)=> ({
    tag: "",

    setTag: (newTag) => 
        set(() => ({tag: newTag})),
}));