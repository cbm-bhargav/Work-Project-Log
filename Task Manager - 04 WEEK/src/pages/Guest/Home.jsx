import React from "react";
import Button from "../../components/UI/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className=" bg-slate-50 text-slate-700 selection:bg-orange-500/30">
      <section className="flex flex-col items-center justify-center px-6 py-12 text-center space-y-6">
        <h1 className="text-7xl font-extrabold">
          Task <span className="text-indigo-500">Manager...</span>
        </h1>
        <p className="max-w-2xl text-lg text-slate-400">
          TM is now faster, lighter and easier to use, providing consistent user
          experience across all the platforms. Everything still feels familiar,
          yet everything is different.
        </p>
        <div className="flex">
          <Link
            to="/login"
            className="px-6 py-2 text-lg text-indigo-500 bg-white border-2 border-indigo-500 rounded-xl hover:text-white hover:bg-indigo-500 transition"
          >
            Login Now
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-slate-800 bg-slate-200 p-8">
          <h2 className="text-2xl font-extrabold mb-4">Why TM?</h2>
          <p className="text-slate-700 text-md">
            supports distributed and global workforces by enabling structured
            people processes in various roles, locations, and employment types.
            Headquartered in Seattle, Washington, Keka is built for growing and
            enterprise organizations that require dependable people systems to
            support business continuity and long-term growth
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
