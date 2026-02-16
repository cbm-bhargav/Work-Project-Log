import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password
      })
      console.log("res", res.data)
      const status = res.status
      if(status === 200){
        localStorage.setItem("Token",res.data.token)
        navigate("/app",{'replace':true})
      }
    } catch (error) {
      console.log(error?.message)
    }
  }
  return (
    <>
      <main className="w-full h-[88vh] overflow-hidden flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-2xl flex flex-col justify-evenly border-2 border-slate-400 rounded-2xl m-8 p-6">
          <h2 className="text-3xl text-indigo-500 text-center font-extrabold mb-4">Login</h2>
          <label className="text-xl text-black">Email</label>
          <input className="text-xl border-2 border-slate-500 p-1 pl-3 rounded-xl text-black" type="text" placeholder='example@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label className="text-xl text-black mt-3">Password</label>
          <input className="text-xl border-2 border-slate-500 p-1 pl-3 rounded-xl text-black" type="password" placeholder='Sceret@user' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="text-xl bg-white border-2 p-1 mt-10 rounded-xl hover:bg-indigo-500 hover:text-white cursor-pointer">Submit</button>
        </form>
      </main>
    </>
  )
}

export default Login

//create async thunk redux 