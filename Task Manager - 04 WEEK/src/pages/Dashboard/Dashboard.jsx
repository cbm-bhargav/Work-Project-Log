import { useEffect, useState } from "react";
import api from "../../api/axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get("/users");
        const tasksRes = await api.get("/tasks");

        setUsers(usersRes.data.users);
        setTotalUsers(usersRes.data.Total_user);
        setTasks(tasksRes.data.tasks);
        setTotalTasks(tasksRes.data.Total_task);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[88vh]">
        <p className="text-xl text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-[88vh]">
      <h1 className="text-3xl font-bold mb-6">TM Dashboard</h1>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-xl font-semibold text-gray-600">
            Total Users
          </h2>
          <p className="text-4xl font-bold text-indigo-600 mt-2">
            {totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-xl font-semibold text-gray-600">
            Total Tasks
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {totalTasks}
          </p>
        </div>
      </section>

      {/* Users Table */}
      <section className="bg-white p-6 rounded-2xl shadow-lg border mb-8">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-100">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-slate-100 hover:bg-white">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border uppercase">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tasks Table */}
      <section className="bg-white p-6 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="bg-slate-100 hover:bg-white">
                  <td className="p-3 border">{task.title}</td>
                  <td className="p-3 border capitalize">{task.status}</td>
                  <td className="p-3 border">{task.assigned_to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;