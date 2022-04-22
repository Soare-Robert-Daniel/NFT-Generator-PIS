import {createStore} from "solid-js/store";


type IStore = {
    items: {
        id: string
        images: string[]
        selectedImage: number
    }[]
}

const [_store, _setStore] = createStore<IStore>({items: [{id: "item-1", images: [], selectedImage: 0 }]})

export const store = _store;
export const setStore = _setStore;

