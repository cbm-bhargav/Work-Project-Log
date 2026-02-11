import { useState } from "react";
import UserForm from "../components/UserForm.jsx";
import { staticData } from "../constants/data.js";

export const Dashboard = () => {
  const [data, setData] = useState(staticData);
  const [editUser, setEditUser] = useState({});
  const [showForm, setShowForm] = useState(false);

  const addUser = (newUser) => {
    setData((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
    setShowForm(false);
  };

  const updateUser = (updatedUser) => {
    setData((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditUser({});
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const user = data.find((user) => user.id === id);
    setEditUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setData(data.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Users Dashboard</h1>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150"
          >
            + Add New User
          </button>
        )}
      </header>

      <main className="px-8 py-6">

        {/* Form Panel */}
        {showForm && (
          <div className="mb-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <UserForm
              key={editUser?.id || "new"}
              editUser={editUser}
              onClose={() => { setShowForm(false); setEditUser({}); }}
              onSubmit={editUser?.id ? updateUser : addUser}
            />
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-700">
              <thead>
                <tr className="bg-slate-800 text-slate-100 text-xs uppercase tracking-wider">
                  {["#", "Name", "Gender", "Email", "Role", "Birthdate", "Phone", "Password", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-indigo-50 transition-colors duration-100 bg-white"
                  >
                    <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">
                      {user.id}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-medium text-slate-800 whitespace-nowrap">{user.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 capitalize text-slate-500">{user.gender || "—"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{user.email}</td>

                    <td className="px-5 py-3.5">
                      {user.role ? (
                        <span className="m-2 px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                          {user.role}
                        </span>
                      ) : "—"}
                    </td>

                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{user.birthdate || "—"}</td>
                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{user.phoneNumber || "—"}</td>

                    <td className="px-5 py-3.5 font-mono text-slate-500 tracking-widest text-xs select-none">
                      {user.password}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-lg border border-indigo-200 hover:border-indigo-600 transition-all duration-150 active:scale-95"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-500 transition-all duration-150 active:scale-95"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-14 text-slate-400">
                      <p className="font-medium text-slate-500">No users found</p>
                      <p className="text-xs mt-1">Click "+ Add New User" to get started.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};