import React from "react";
import { Routes, Route, HashRouter } from 'react-router-dom';
import MusicBlock from './components/music/MusicBlock';
import "./App.css";
{/* importing mainPage */}
import Header from './components/header/Header';
import MainPage from './components/pages/MainPage';
// import './index.css'
import './App.css'


function App() {

  return (
    <>
      <HashRouter> {/* So that the homepage is "MainPage" */}
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;
