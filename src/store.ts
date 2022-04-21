import {createStore} from "solid-js/store";


type IStore = {
    items: {
        id: string
        images: string[]
    }[]
}

const [_store, _setStore] = createStore<IStore>({items: [{id: "item-1", images: []}]})

export const store = _store;
export const setStore = _setStore;

