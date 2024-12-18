import axios from "axios";
import { useState } from "react";
export default function Forget(){
    const [email, setEmail] = useState("");
    const handlesubmit =(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/forget-password',{email}).catch((error)=>{
            console.log(error)
        })
        
    }
    return (
        <>
        <form onSubmit={handlesubmit}>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter your email" />
            <button type="submit">submit</button>
        </form>
        </>
    )
}