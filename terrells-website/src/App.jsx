import { Routes, Route, HashRouter } from 'react-router-dom';
import { useState } from "react";
import "./App.css";
{/* importing mainPage */}
import Header from './components/header/Header';
import MainPage from './components/pages/MainPage';
import CreationPage from "./components/pages/CreationPage";
import SignInPage from "./components/pages/SignInPage";
// import './index.css'
import beats from "./beats";

import { AuthProvider } from "./components/context/AuthContext";
import AdminRoute from "./components/AdminRoute";


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
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage beatList={beatList} />} />
            <Route element={<AdminRoute />}>
              <Route path="/creationPage" element={<CreationPage beatList={updateBeatList} setBeatList={setBeatList} />} />
            </Route>
            <Route path="/signIn" element={<SignInPage />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App;
