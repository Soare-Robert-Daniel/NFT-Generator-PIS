import {Component, createSignal} from "solid-js";
import styles from './AddPanel.module.css';
import {setStore} from "../store";

const AddPanel: Component = () => {

    const [count, setCount] = createSignal(2);

    return (
        <div>
            <button
                class={styles.btn}
                onClick={() => {
                    const id = `item-${count()}`
                    setCount(x => x + 1)
                    setStore('items', i => [...i, {id, images: []}])
                }}
            >
                Add
            </button>
        </div>
    )
}

export default AddPanel;
