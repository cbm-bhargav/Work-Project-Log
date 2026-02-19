import React from "react";

import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Task = () => {
  const { user: loggedInUser } = useAuth();
  console.log("loggedInUser :", loggedInUser);

  const initialFormData =
    loggedInUser?.role === "manager"
      ? {
          title: "",
          description: "",
          assigned_to: "",
          status: "",
        }
      : {
          status: "",
        };

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(initialFormData);

  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    if (loggedInUser?.role === "manager") {
      fetchUsers();
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTaskId) {
        if (loggedInUser?.role === "manager") {
          await api.patch(`/tasks/${editingTaskId}/manage`, formData);
        } else {
          await api.patch(`/tasks/${editingTaskId}/status`, formData);
        }
      } else {
        await api.post("/tasks", formData);
      }

      const resetFormData =
        loggedInUser?.role === "manager"
          ? { title: "", description: "", assigned_to: "", status: "" }
          : { status: "" };
      setFormData(resetFormData);
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    const setData =
      loggedInUser?.role === "manager"
        ? { title: task.title, description: task.description, assigned_to: task.assigned_to, status: task.status }
        : { status: task.status };
    setFormData(setData);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h2>

      {loading && <p className="text-blue-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Manager Form */}
      {loggedInUser?.role === "manager" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select User</option>

            {users
              .filter((user) => user.role === "user")
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="pending">Pending</option>
            <option value="inprogress">Inprogress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {editingTaskId ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      )}

      {/* User Form */}
      {loggedInUser?.role === "user" && editingTaskId && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="pending">Pending</option>
            <option value="inprogress">Inprogress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {editingTaskId ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      )}

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((u) => (
          <div
            key={u.id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-md font-semibold text-gray-400">
                Task #{u.id}
              </span>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full capitalize
            ${
              u.status === "completed"
                ? "bg-green-100 text-green-600"
                : u.status === "inprogress"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
            }`}
              >
                {u.status}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{u.title}</h3>

            <p className="text-md text-gray-600 mb-4">{u.description}</p>

            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="font-medium">Assigned To:</span>{" "}
                {u.assigned_to}
              </p>
              <p>
                <span className="font-medium">Created By:</span> {u.created_by}
              </p>
            </div>

            {loggedInUser?.role === "manager" && (
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleEdit(u)}
                  className="flex-1 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            )}

            {loggedInUser?.role === "user" && (
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleEdit(u)}
                  className="flex-1 text-md bg-yellow-300 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}

        {tasks?.length === 0 && !loading && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No Tasks Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
