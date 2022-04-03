import styles from './PanelToggle.module.css'
import {Component, createSignal} from "solid-js";

type ToggleProps = {
    name: string
}

const PanelToggle: Component<ToggleProps> = props => {
    const [labelName, setLabelName] = createSignal(props.name)
    const [show, setShow] = createSignal(true)

    return (
        <div class={styles.container}>
            <div class={`${styles.switch} ${!show() && styles.closed}`}>
                <div
                    onClick={() => setShow(prev => !prev)}
                >
                    <span>{labelName()}</span>
                </div>
            </div>
            {
                show() && (
                    <div class={styles.content}>
                        <div class={styles["input-name"]}>
                            <label class={styles["input-label"]}>
                                Name
                            </label>
                            <input
                                class={styles["input-value"]}
                                value={labelName()}
                                onChange={event => {
                                    setLabelName(event.currentTarget.value)
                                }}/>
                        </div>
                        {props.children}
                    </div>
                )
            }
        </div>
    )
}

export default PanelToggle;
