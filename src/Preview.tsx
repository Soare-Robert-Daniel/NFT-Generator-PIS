import {Component, createEffect, createSignal, on, onCleanup, onMount} from "solid-js";
import style from './Preview.module.css'
import {fabric} from "fabric";
import {store} from "./store";
import {Canvas,} from "fabric/fabric-impl";

const Preview: Component = () => {

    const [canvas, setCanvas] = createSignal<Canvas>()

    let r: HTMLCanvasElement | undefined;

    onMount(() => {

        console.log(fabric)

        const c = new fabric.Canvas('canvas', {
            width: r?.clientWidth || 300,
            height: r?.clientHeight || 300
        });

        c.calcOffset()

        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20,
            angle: 45
        });

        c.add(rect);
        setCanvas(c)
    })

    createEffect(on(canvas, (c) => {
        if (c) {
            store.items.forEach(item => {
                item?.images.forEach(img => {
                    fabric.Image.fromURL(img, (x) => {
                        c.add(x)

                    })
                })
            })
        }
    }, {defer: true}))

    createEffect(() => {
        // Clean the canvas
        canvas()?.getObjects().forEach(o => canvas()?.remove(o))

        // Draw the images
        store.items.forEach(item => {
            item?.images.forEach(imgURL => {
                fabric.Image.fromURL(imgURL, (img) => {
                    img.scale(0.2)
                    canvas()?.add(img)
                })
            })
        })
    })

    onCleanup(() => canvas()?.getObjects().forEach(o => canvas()?.remove(o)))

    return (
        <div class={style.container}>
            <canvas ref={r} id="canvas" class={style.canvas}>
            </canvas>
        </div>
    )
}

export default Preview;
