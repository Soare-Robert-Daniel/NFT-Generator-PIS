import {Component, For} from "solid-js";
import PanelToggle from "./components/PanelToggle";
import AddPanel from "./components/AddPanel";
import styles from './Sidebar.module.css';
import ImageLoader from "./components/ImageLoader";
import {store} from "./store";

const Sidebar: Component = () => {
    return (
        <div class={styles.sidebar}>
            <For each={store.items} fallback={<div>Loading...</div>}>
                {
                    (item) => (
                        <PanelToggle name={"Item 1"}>
                            <ImageLoader id={item.id} images={item.images} selectedImage={item.selectedImage}/>
                        </PanelToggle>
                    )
                }
            </For>

            <AddPanel/>
        </div>
    )
}

export default Sidebar;
