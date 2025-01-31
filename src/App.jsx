
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TrafficMap from './components/TrafficMap'
import RouteOptimizationMap from './components/RouteOptimizationMap'
import Navbar from './components/Navbar';


function App() {
  return (
    <>
<Navbar/>
      
      <div className="">
        <Routes>
          <Route path="/traffic" element={<TrafficMap/>}/>
          <Route path="/route-optimization" element={<RouteOptimizationMap/>}/>
        </Routes>

   

      </div>
=
    </>
  );
}

export default App;
