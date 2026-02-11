// import { useState } from "react";
// import api from "../services/api.js";

// function UserForm({ selectedUser, onSuccess, clearSelected}) {
//     const [ name, setName ] = useState(selectedUser?.name || "")
//     const [ department, setDepartment ] = useState(selectedUser?.department || "")
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if(selectedUser){
//                 await api.patch(`/users/${selectedUser.id}`, { name, department});
//             }else{
//                 await api.post("/users", { name, department});
//             }
//             clearSelected()
//             onSuccess();
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>{selectedUser ? 'Edit user' : 'Add User' }</h2>
            
//             <input
//                 placeholder="Name"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//             />
            
//             <input 
//                 placeholder="Department"
//                 value={department}
//                 onChange={e => setDepartment(e.target.value)}
//             />
//             <button>{selectedUser ? "Edit" : "Add"}</button>
//         </form>
//     )
// }

// export default UserForm

import { useState } from "react";
import api from "../services/api.js";

function UserForm({ selectedUser, onSuccess, clearSelected }) {
    const [name, setName] = useState(selectedUser?.name || "");
    const [department, setDepartment] = useState(
        selectedUser?.department || ""
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                await api.patch(`/users/${selectedUser.id}`, {
                    name,
                    department,
                });
            } else {
                await api.post("/users", { name, department });
            }
            clearSelected();
            onSuccess();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-50 border rounded-xl p-6 shadow-md"
        >
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
                {selectedUser ? "Edit User" : "Add User"}
            </h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    {selectedUser ? "Update" : "Add"}
                </button>

                {selectedUser && (
                    <button
                        type="button"
                        onClick={clearSelected}
                        className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default UserForm;
