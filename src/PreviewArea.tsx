import { Component, createSignal, For } from "solid-js";
import styles from './PreviewArea.module.css'
import {setStore, store} from "./store";

const PreviewArea: Component = () => {

    const [configuration, setConfiguration] = createSignal([])

    return (
        <div class={styles.container}>
            <For each={configuration()}>
                {
                    (item) => (
                        <div>
                            
                        </div>
                    )
                }
            </For>
        </div>
    )
}

export default PreviewArea;