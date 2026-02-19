import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const User = () => {
  const { user: loggedInUser } = useAuth();
  console.log('loggedInUser :',loggedInUser)

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
        Authorization: `Bearer ${token}`
      }
    });
      setUsers(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUserId) {
        await api.patch(`/users/${editingUserId}`, formData);
      } else {
        await api.post("/users", formData);
      }

      setFormData({ name: "", email: "", password: "", role: "user" });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        User Management
      </h2>

      {loading && <p className="text-blue-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Admin Form */}
      {loggedInUser?.role === "admin" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required={!editingUserId}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {editingUserId ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-indigo-500 text-white text-2xl">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              {loggedInUser?.role === "admin" && (
                <th className="p-3">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="font-semibold">
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t hover:bg-gray-100 transition"
              >
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>

                {loggedInUser?.role === "admin" && (
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
