import { Routes, Route, HashRouter } from 'react-router-dom';
import { useState } from "react";
import "./App.css";
{/* importing mainPage */}
import Header from './components/header/Header';
import MainPage from './components/pages/MainPage';
// import './index.css'
import './App.css'
import CreationPage from "./components/pages/CreationPage";

import beats from "./beats";

function App() {

   const [beatList, setBeatList] = useState(() => {
    const savedBeats = localStorage.getItem("beats");

    if (savedBeats) {
      return JSON.parse(savedBeats);
    }

    return beats;
  });

  const updateBeatList = (update) => {
  setBeatList((currentBeats) => {

    const newBeatList =
      typeof update === "function"
        ? update(currentBeats)
        : update;

    localStorage.setItem(
      "beats",
      JSON.stringify(newBeatList)
    );

    return newBeatList;
  });
};


  return (
    <>
      <HashRouter> {/* So that the homepage is "MainPage" */}
        <Header />
        <Routes>
          <Route path="/" element={<MainPage beatList={beatList} />} />
          <Route path="/creationPage" element={<CreationPage beatList={updateBeatList} setBeatList={setBeatList} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;
