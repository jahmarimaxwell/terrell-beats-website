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

  const [beatList, setBeatList] = useState(beats);

  return (
    <>
      <HashRouter> {/* So that the homepage is "MainPage" */}
        <Header />
        <Routes>
          <Route path="/" element={<MainPage beatList={beatList} />} />
          <Route path="/creationPage" element={<CreationPage beatList={beatList} setBeatList={setBeatList} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;
