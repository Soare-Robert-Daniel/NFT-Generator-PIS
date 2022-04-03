import {Component} from "solid-js";
import styles from './AddPanel.module.css';

const AddPanel: Component = () => {
    return (
        <div>
            <button
                class={styles.btn}
            >
                Add
            </button>
        </div>
    )
}

export default AddPanel;
