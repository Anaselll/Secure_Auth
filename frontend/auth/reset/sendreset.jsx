import { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function ResetPassword(){
    let {token}=useParams()
    const [password,setPassword]=useState("")
    const handlesubmit=(e)=> {
        e.preventDefault()
        axios.put(`/reset/password/${token}`).then(()=>{
            alert("Password Reset Successfully")
        }).catch(()=>{
            alert("Password Reset Failed")
        })
        
    }
    return(
        <>
        <form onSubmit={handlesubmit}>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter new password"/>
            <button>confirm the new password</button>
        </form>
        </>
    )
}