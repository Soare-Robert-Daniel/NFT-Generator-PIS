import type {Component} from 'solid-js';
import styles from './App.module.css';
import Sidebar from "./Sidebar";
import Preview from "./Preview";

const App: Component = () => {
  return (
    <div class={styles.App}>
        <Sidebar></Sidebar>
        <Preview></Preview>
    </div>
  );
};


export default App;
