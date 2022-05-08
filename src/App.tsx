import type {Component} from 'solid-js';
import styles from './App.module.css';
import Sidebar from "./Sidebar";
import CanvasArea from "./CanvasArea";

const App: Component = () => {
  return (
    <div class={styles.App}>
        <Sidebar></Sidebar>
        <CanvasArea></CanvasArea>
    </div>
  );
};


export default App;
