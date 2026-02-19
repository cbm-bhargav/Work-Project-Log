import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth()
  console.log(user)
  const userRole = user?.role?.toUpperCase()

  return (
    <>
      <main className="w-full h-[88vh] overflow-hidden flex items-center justify-center">
        <section className="flex flex-col w-2xl justify-evenly bg-indigo-500 border-2 border-black rounded-2xl m-8 p-6">    
          <p className="text-2xl font-semibold text-slate-600 text-center m-2 px-3 py-1 border-2 bg-white rounded-full">{userRole}</p>
          <h2 className="text-4xl text-white m-3">{user?.name}</h2>
          <p className="text-3xl text-white mx-3">{user?.email}</p>
        </section>
      </main>
    </>
  );
};

export default Profile;
