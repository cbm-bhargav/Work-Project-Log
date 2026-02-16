import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("Token");
        console.log(token)
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("res", res.data);
        setUser(res.data.current_user);
      } catch (error) {
        console.log(error?.message);
      }
    }
    fetchUser()
  }, [])

  const userRole = user?.role?.toUpperCase()

  return (
    <>
      <main className="w-full h-[88vh] overflow-hidden flex items-center justify-center">
        <section className="flex flex-col w-2xl justify-evenly bg-indigo-500 border-2 border-black rounded-2xl m-8 p-6">    
          <p className="text-2xl font-semibold text-slate-600 text-center m-2 px-3 py-1 border-2 bg-white rounded-full">{userRole}</p>
          <h2 className="text-4xl text-white m-3">{user.name}</h2>
          <p className="text-3xl text-white mx-3">{user.email}</p>
        </section>
      </main>
    </>
  );
};

export default Profile;
