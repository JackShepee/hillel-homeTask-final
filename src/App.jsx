import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./components/pages/MainPage";
import SmoothieConstructorPage from "./components/pages/SmoothieConstructorPage";
import CartPage from "./components/pages/CartPage";
import AboutUs from "./components/pages/AboutUs";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/smoothie-constructor"
          element={<SmoothieConstructorPage />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
