
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hello from "./components/hello";


function App() {
  return (
    <>

    <Navbar />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

      <div className="bg-black flex flex-col font-inter">
        <Routes>
          <Route path="/" element={<Hello/>}/>
        </Routes>

      </div>
    </>
  );
}

export default App;
