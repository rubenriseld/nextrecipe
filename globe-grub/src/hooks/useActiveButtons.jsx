import {create} from "zustand"
// import {persist} from "zustand/middleware"


export const useActiveButtons = create((set)=> ({
    activeButtons: [],

    setActiveButtons: (newActiveButtons) => 
        set(() => ({activeButtons: newActiveButtons})),

    removeActiveButtons: () => 
        set({activeButtons: []}),
}));