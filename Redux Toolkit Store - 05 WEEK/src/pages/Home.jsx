import React from "react";
import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to the Redux Toolkit Store
      </h2>

      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Products</h3>
        <Products />
      </section>
    </div>
  );
};

export default Home;
