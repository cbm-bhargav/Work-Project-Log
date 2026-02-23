import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishList" element={<WishList/>}/>
          <Route path="*" element={"404 Not Found"} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
