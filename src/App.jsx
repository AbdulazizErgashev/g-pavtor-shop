import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ShopProvider from "./context/Context";

export default function App() {
  return (
    <>
      <Navbar />
      <ShopProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ShopProvider>
    </>
  );
}
