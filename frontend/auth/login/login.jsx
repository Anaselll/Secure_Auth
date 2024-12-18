import { Button,TextField,Container } from "@mui/material"
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { useState } from "react";
export default function Login(){
    const redirect=useNavigate()

    const [user,setUser]=useState({
        gmail:'',
        password:''
    })

    const handlesubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/auth/login',user).then((res)=>{
           alert("user succefully login");
           console.log(res.data);
           localStorage.setItem("accessToken", res.data.access_token);
           localStorage.setItem("refreshToken", res.data.refresh_token);
           redirect('/')

        }).catch((error)=>{
            alert("user error login");
            console.log(error);
        })
        
    }
    return (
      <>
        <Container>
          <form onSubmit={handlesubmit}>
          
            <TextField
              label="Email"
              variant="outlined"
              value={user.gmail}
              onChange={(e) => setUser({ ...user, gmail: e.target.value })}
              fullWidth
              style={{ marginBottom: "16px" }}
            />
            <TextField
              label="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              variant="outlined"
              type="password"
              fullWidth
              style={{ marginBottom: "16px" }}
            />
        
            <Button type="submit" variant="contained" color="primary" fullWidth>
              register 
            </Button>
          </form>
          <button onClick={()=>redirect('/forget/password')}>forget password?</button>
        </Container>
      </>
    );
}