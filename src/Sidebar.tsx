import {Component} from "solid-js";
import PanelToggle from "./components/PanelToggle";
import AddPanel from "./components/AddPanel";
import styles from './Sidebar.module.css';
import ImageLoader from "./components/ImageLoader";

const Sidebar: Component = () => {
    return (
        <div class={styles.sidebar}>
            <PanelToggle name={"Item 1"}>
                <ImageLoader/>
            </PanelToggle>
            <AddPanel/>
        </div>
    )
}

export default Sidebar;
