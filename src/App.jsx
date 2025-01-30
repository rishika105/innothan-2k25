import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hello from "./components/hello";

function App() {
  return (
    <>
      <div className="bg-black flex flex-col font-inter">
        <Routes>
          <Route path="/" element={<Hello/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
