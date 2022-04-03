import type {Component} from 'solid-js';
import styles from './App.module.css';
import Sidebar from "./Sidebar";

const App: Component = () => {
  return (
    <div class={styles.App}>
        <Sidebar></Sidebar>
    </div>
  );
};

export default App;
