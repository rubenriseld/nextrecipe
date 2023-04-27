import {create} from 'zustand'

export const useRecommendation = create((set)=> ({
    recoResults: [],
    setRecoResults: (newRecoResult) =>
    set(() => ({recoResults: newRecoResult})),
    removeRecoResults: () =>
    set({recoResults: []}),
}));