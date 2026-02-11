// import { useState, useEffect } from "react";
// import api from "../services/api.js";
// import UserForm from "../components/userForm.jsx";

// function UsersPage() {
//     const [ users, setUsers ] = useState([])
//     const [ selectedUser, setSelectedUser ] = useState(null)
//     const [ loading, setLoading ] = useState(true)

//     const handleDelete = async (id) => {
//         try {
//             await api.delete(`/users/${id}`)
//             fetchUsers();
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const handleEdit =(user)=>{  
//         setSelectedUser(user);
//     }

//     const fetchUsers = async () => {
//         try {
//             const res = await api.get("/users")
//             setUsers(res.data)
//         } catch (error) {
//             console.error(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchUsers();
//     }, [])
//     useEffect(()=>{

//     },[selectedUser])

//     if(loading) {
//         return <h1> Users Loading .... </h1>
//     }

//     return (
//         <>
//         <h1>User Management App</h1>

//         <ul>
//             {
//                 users.map(user => (
//                     <div key={user.id}>
//                         <h2>{user.name}</h2>
//                         <h3>{user.department}</h3>
//                         <button onClick={()=> handleEdit(user)}> Edit </button>
//                         <button onClick={() => handleDelete(user.id)}> Delete </button>
//                     </div>
//                 ))
//             }
//         </ul>

//         <UserForm key={selectedUser?.id || "new"} selectedUser={selectedUser} onSuccess={fetchUsers} clearSelected= {() => setSelectedUser(null)} />
//         </>
//     )
// }

// export default UsersPage;

import { useState, useEffect } from "react";
import api from "../services/api.js";
import UserForm from "../components/userForm.jsx";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-semibold text-gray-600">
                    Users Loading...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    User Management App
                </h1>

                <div className="my-10">
                    <UserForm
                        key={selectedUser?.id || "new"}
                        selectedUser={selectedUser}
                        onSuccess={fetchUsers}
                        clearSelected={() => setSelectedUser(null)}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {user.name}
                            </h2>
                            <p className="text-gray-500 mb-4">
                                {user.department}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UsersPage;
