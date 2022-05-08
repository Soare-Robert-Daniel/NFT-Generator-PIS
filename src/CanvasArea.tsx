import {Component, createEffect, createSignal, Match, on, onCleanup, onMount, Show, Switch} from "solid-js";
import style from './CanvasArea.module.css'
import {fabric} from "fabric";
import {setStore, store} from "./store";
import {Canvas, Image,} from "fabric/fabric-impl";
import LoadingCircle from "./components/LoadingCircle";
import fastCartesian from 'fast-cartesian'
import JSZip from "jszip"

type InCanvas = {
    [index: string]: Image
}

function getBase64String(dataURL: string): string {
    const idx = dataURL.indexOf("base64,") + "base64,".length
    return dataURL.substring(idx)
}

const CanvasArea: Component = () => {

    const [canvasImg, setCanvasImg] = createSignal<InCanvas>({})
    const [canvas, setCanvas] = createSignal<Canvas>()
    const [exportLink, setExportLink] = createSignal<string>()
    const [exportingStatus, setExportingStatus] = createSignal<'start'|'loading'|'done'>('start')
    const [showGenerating, toggleGenerating] = createSignal(false)

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
                        x.scaleToHeight(80)
                        setCanvasImg(o => ({...o, [item.id]: x}))
                        canvas()?.add(x)
                    })
                } else {
                    canvasImg()[item.id].setSrc( imgToRender, () => {
                        canvas()?.renderAll()
                    })
                }
            }
        })
    })

    onCleanup(() => canvas()?.getObjects().forEach(o => canvas()?.remove(o)))

    const createBundle = async () => {
        const dims = store
        .items
        .map( item => item.images.length )
        .map( dim => Array.from({length: dim}, (_, i) => i + 1) )

        toggleGenerating(true);
        setExportingStatus('loading')

        const combinations = fastCartesian(dims);
        console.log(combinations)
        const urls: string[] = [];
        const create = (c: number[]): Promise<string> => {
            return new Promise((resolve, reject) => {
                let ready = 0;
                const t = setTimeout( () => reject(''), 5000);

                c.forEach( (i, itemIdx) => {
                    console.log(i-1, store.items[itemIdx].images[i-1])
                    canvasImg()[store.items[itemIdx].id].setSrc(  store.items[itemIdx].images[i-1], async () => {
                        canvas()?.renderAll()
                        ready++;
                        if( ready === c.length ) {
                            clearTimeout(t);

                            await new Promise(r => setTimeout(r, 20));

                            resolve(canvas()?.toDataURL({format: 'png'} ) || '');
                        }
                    } )
                } )
            })
        }

        for( let k = 0; k < combinations.length; k++) {
            const url: string = await create(combinations[k]);
            urls.push(url)
        }

        var bundle = new JSZip();

        urls.forEach( (url, i) => {
            if( ! url ) return;
            console.log(url)
            bundle?.file(`image-${i}.png`, getBase64String(url), { base64: true })
        })

        const blob = await bundle.generateAsync({ type: 'blob' })

        setExportLink(URL.createObjectURL(blob));
        setExportingStatus('done')
        toggleGenerating(false);
    }

    return (
        <div class={style.container}>
            <div class={style.menu}>
                {/* <button
                    class={style.export}
                    onClick={() => {
                        setExportingStatus('loading')
                        const url = canvas()?.toDataURL({format: 'png'}) || '';
                        setExportLink(url)
                        setExportingStatus('done')
                    }}
                >
                    Export
                </button> */}
                <button
                    class={style.export}
                    onClick={() => {
                       createBundle()
                    }}
                >
                   Create Bundle
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
                            <svg width={30} height={30} class="w-6 h-6" fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                    </Match>
                </Switch>
            </div>
            <canvas ref={r} id="canvas" class={style.canvas}>
            </canvas>
            <Show when={showGenerating()}>
                    <div class={style.loading}>
                        <LoadingCircle />
                        Generating the bundle
                    </div>
            </Show>
        </div>
    )
}

export default CanvasArea;
