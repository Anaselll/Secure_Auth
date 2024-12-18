import { useEffect } from "react";
import Isauth from "../auth/is.Auth";
import { useNavigate } from "react-router-dom";

export default function App() {
  let redirect=useNavigate()
  useEffect(()=>{
 if (!Isauth()){
  redirect("/auth/login");
 }
  },[redirect])
  const logout=()=>{
    localStorage.removeItem("accessToken");
    window.location.href = "/auth/login" 
  }
  console.log(localStorage.getItem("accessToken"));
  return (
    <>
      <h1>thats home</h1>
      <button onClick={logout}>logout</button>
    </>
  );
}
