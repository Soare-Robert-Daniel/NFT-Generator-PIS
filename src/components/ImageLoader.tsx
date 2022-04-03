import {Component, createSignal} from "solid-js";
import styles from './ImageLoader.module.css';

const ImageLoader: Component = () => {
    const [imgSrc, setImgSrc] = createSignal<string>('')
    return (
        <div class={styles.container}>
            <div class={styles.preview}>
                {
                    imgSrc() && (
                        <img width={100} height={100} src={imgSrc()}/>
                    )
                }
            </div>
            <input
                class={styles.input}
                type="file"
                accept="image/*"
                name={"image-loader"}
                onChange={event => {
                    const files = event.currentTarget.files;
                    const file = files?.[0]
                    if (file) {
                        const reader = new FileReader()

                        reader.onload = () => {
                            if (reader.result) {
                                setImgSrc(reader.result as string);
                            }
                        }

                        reader.readAsDataURL(file);
                    }
                }}
            />
        </div>
    )
}

export default ImageLoader;
