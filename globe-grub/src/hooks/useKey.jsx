import {create} from "zustand"
// import {persist} from "zustand/middleware"

const keyArray = [
    "13c6c14454a748769e3611a7cf719862",
    "74c179cdd6bf42fab75869c258580b05",
    "c02162ede9394dd8bca983829213bd71",
    "85ce5287879e42978484fcf300dace17",
    "8fbd9413e79a49bfaa909d68f22e0476",
    "ce46b5aef3da4d67b273b1b7dec8567f",
    "15c980413ad44f09ba2ac7e73f076610",
    "e50fb6304553492781cba43da8b4bc7f",
    "32603e2291624b4689643c2428fbe5f1",
    "7e4ba385c74c4c0595bbb872618f7fc2",
    "9c18433a167642f1a942f5b66f28a73e",
    "7d22a6b4acf44702bdd65c55ce0b9290",
    "44494a778e8c447a857f4b735fbc22cd",
    "86a723f2dd0a43d2b53affefcab429de",
    "648c82ab2f494e7481f45e08a7222503",
    "8a2f10c7e7d54edcb8d62c477eefe3e4"
];

const getRandomKey = () => {
    const currentKey = keyArray[Math.floor(Math.random()*keyArray.length)];
    return currentKey
}  




export const useKey = create((set)=> ({
    //byt key här för att byta på alla ställen
    key: getRandomKey(),
    setKey: (newKey) => 
        set(() => ({key: newKey})),

    removeKey: () => 
        set({key: []}),

    
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