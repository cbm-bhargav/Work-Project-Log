import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./Sidebar";

const GuestLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden bg-slate-50">
        <main className="w-full overflow-y-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default GuestLayout;