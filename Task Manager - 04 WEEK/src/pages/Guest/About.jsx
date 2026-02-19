import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="bg-slate-50 text-slate-700 selection:bg-orange-500/30 min-h-screen">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-16 text-center space-y-6">
        <h1 className="text-6xl font-extrabold">
          About <span className="text-indigo-500">Task Manager</span>
        </h1>
        <p className="max-w-3xl text-lg text-slate-500">
          Task Manager (TM) is a simple yet powerful productivity tool designed 
          to help teams and individuals organize, track, and complete their work 
          efficiently. Built with modern technologies, TM focuses on speed, 
          clarity, and seamless user experience.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-slate-700">Our Mission</h2>
          <p className="leading-relaxed text-md">
            Our mission is to simplify task management by providing structured 
            workflows for administrators, managers, and users. We aim to support 
            growing teams with a reliable system that enhances collaboration, 
            accountability, and productivity.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        <div className="border-indigo-500 bg-indigo-100 p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">
            Role-Based Access
          </h3>
          <p className="text-md">
            Secure authentication with Admin, Manager, and User roles 
            ensures proper access control and data protection.
          </p>
        </div>

        <div className="border-indigo-500 bg-indigo-100 p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">
            Smart Task Tracking
          </h3>
          <p className="text-md">
            Organize tasks efficiently, assign responsibilities, and 
            monitor progress in real time.
          </p>
        </div>

        <div className="border-indigo-500 bg-indigo-100 p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">
            Clean & Modern UI
          </h3>
          <p className="text-md">
            Designed with simplicity and performance in mind to provide 
            a smooth experience across devices.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center px-6 py-16 text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Ready to get started?
        </h2>
        <Link
          to="/login"
          className="px-6 py-2 text-lg text-indigo-500 bg-white border-2 border-indigo-500 rounded-xl hover:text-white hover:bg-indigo-500 transition"
        >
          Login Now
        </Link>
      </section>

    </main>
  );
};

export default About;