import {Component, createEffect, createSignal, Match, on, onCleanup, onMount, Show, Switch} from "solid-js";
import style from './Preview.module.css'
import {fabric} from "fabric";
import {setStore, store} from "./store";
import {Canvas, Image,} from "fabric/fabric-impl";
import LoadingCircle from "./components/LoadingCircle";

type InCanvas = {
    [index: string]: Image
}

const Preview: Component = () => {

    const [canvasImg, setCanvasImg] = createSignal<InCanvas>({})
    const [canvas, setCanvas] = createSignal<Canvas>()
    const [exportLink, setExportLink] = createSignal<string>()
    const [exportingStatus, setExportingStatus] = createSignal<'start'|'loading'|'done'>('start')

    let r: HTMLCanvasElement | undefined;

    onMount(() => {
        const c = new fabric.Canvas('canvas', {
            width: r?.clientWidth || 300,
            height: r?.clientHeight || 300
        });

        c.calcOffset()
        setCanvas(c)
    })




    createEffect(() => {
        // Clean the canvas
        //canvas()?.getObjects().forEach(o => canvas()?.remove(o))

        // Draw the images
        store.items.forEach(item => {
            const imgToRender = item.images?.[item.selectedImage];
            //console.log(imgToRender)
            if(imgToRender) {
                if( !canvasImg()[item.id] ) {
                    fabric.Image.fromURL(imgToRender, (x) => {
                        x.scale(0.3)
                        setCanvasImg(o => ({...o, [item.id]: x}))
                        canvas()?.add(x)
                    })
                } else {
                    canvasImg()[item.id].setSrc( imgToRender)
                }
            }
            
        })
    })

    onCleanup(() => canvas()?.getObjects().forEach(o => canvas()?.remove(o)))

    return (
        <div class={style.container}>
            <div class={style.menu}>
                <button
                    class={style.export}
                    onClick={() => {
                        setExportingStatus('loading')
                        const url = canvas()?.toDataURL({format: 'png'}) || '';
                        setExportLink(url)
                        setExportingStatus('done')
                    }}
                >
                    Export
                </button>
                <Switch>
                    <Match when={exportingStatus() === "start"}>
                        <div></div>
                    </Match>
                    <Match when={exportingStatus() === "loading"}>
                        <LoadingCircle/>
                    </Match>
                    <Match when={exportingStatus() === "done"}>
                        <a
                            class={style.download}
                            download={"nft-generator"}
                            href={exportLink()}
                        >
                            <svg width={30} height={30} class="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                    </Match>
                </Switch>
            </div>
            <canvas ref={r} id="canvas" class={style.canvas}>
            </canvas>
        </div>
    )
}

export default Preview;
