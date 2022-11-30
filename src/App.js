import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import AppBar from "./components/AppBar/AppBar";
import Convertisseur from "./components/Convertisseur/Convertisseur";
import Erreur from "./components/Erreur/Erreur";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <AppBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Convertisseur />} />
            <Route path="/404" element={<Erreur />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
