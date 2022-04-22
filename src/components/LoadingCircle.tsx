import {Component} from "solid-js";
import style from './LoadingCircle.module.css'

const LoadingCircle: Component =  () => {
    return (
        <div class={style.loading}></div>
    )
}

export default LoadingCircle;
