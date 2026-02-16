import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./Sidebar";

const ProtectedLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden bg-slate-50">
        <nav className="w-1/5 bg-slate-100 border-r-2 border-slate-400">
          <Sidebar />
        </nav>
        <main className="w-4/5 overflow-y-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;