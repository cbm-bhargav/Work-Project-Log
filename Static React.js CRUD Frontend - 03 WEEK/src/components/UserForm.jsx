import { useState } from "react";

const emptyUser = {
  name: "",
  gender: "",
  email: "",
  role: "",
  birthdate: "",
  phoneNumber: "",
  password: "",
};

const inputClass =
  "w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white transition-all duration-150 placeholder:text-slate-300";

const UserForm = ({ editUser, onClose, onSubmit }) => {
  const [user, setUser] = useState(editUser?.id ? editUser : emptyUser);
  const isEditing = Boolean(editUser?.id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <div className="px-6 py-5">

      {/* Form Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className={`text-base font-bold ${isEditing ? "text-amber-600" : "text-indigo-600"}`}>
            {isEditing ? "Edit User" : "Add New User"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEditing ? `Editing: ${editUser.name}` : "Fill in the details below"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 w-8 h-8 rounded-lg text-lg font-light transition-colors flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <div className="h-px bg-slate-100 mb-5" />

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
            <input
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Jane Smith"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="jane@company.com"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone Number</label>
            <input
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="">Select role…</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={user.birthdate}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="User@Sceret"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Gender</label>
            <div className="flex gap-2 pt-1">
              {["male", "female"].map((g) => (
                <label
                  key={g}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer transition-all capitalize
                    ${user.gender === g
                      ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={user.gender === g}
                    onChange={handleInputChange}
                    className="accent-indigo-600"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 mb-4" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 px-4 py-2 rounded-lg transition-all duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`text-sm font-semibold text-white px-5 py-2 rounded-lg active:scale-95 transition-all duration-150
              ${isEditing ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;