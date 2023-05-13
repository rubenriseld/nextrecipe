
import {create} from 'zustand';
//Sparar seachbar input och filterval i state som används i api-anropet
export const useSearchParameters = create((set)=> ({
    inputParameter: "",
    filterParameter: "",
    setInputParameter: (newInputParameter) => 
        set(() => ({inputParameter: newInputParameter})),
    setFilterParameter: (newFilterParameter)=>
    set(()=> ({filterParameter: newFilterParameter})),
}));
