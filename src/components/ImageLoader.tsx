import {Component, Index} from "solid-js";
import styles from './ImageLoader.module.css';
import {setStore} from "../store";
import clsx from 'clsx';

type ImageLoaderProps = {
    id: string,
    images: Readonly<string[]>
    selectedImage: number
}

const ImageLoader: Component<ImageLoaderProps> = (props) => {
    let fileInputRef: HTMLInputElement | undefined;
    return (
        <div class={styles.container}>
            <div class={styles.images}>
                <Index each={props.images}>
                    {
                        (img, index) => (
                            <div 
                                class={clsx(styles.preview,{
                                    [styles.selected]: index === props.selectedImage
                                })}
                                onClick={ () => {
                                    setStore('items', i => i.id === props.id, 'selectedImage', index)
                                }}
                            >
                                {
                                    <img width={100} height={100} alt='image' src={img()}/>
                                }
                            </div>
                        )
                    }
                </Index>
            </div>

            <input
                ref={fileInputRef}
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
                                if (fileInputRef) {
                                    fileInputRef.value = ''
                                }
                                setStore('items', i => i.id === props.id, 'images', images => [...images, reader.result as string])
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
