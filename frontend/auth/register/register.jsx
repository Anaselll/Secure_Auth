import { Button, TextField, Container } from "@mui/material";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Register() {
    let redirect=useNavigate()
    const [user, setUser] = useState({
      username: "",
      gmail: "",
      password: "",
      passwordConfirm: ""
    });
    const handlesubmit=(e)=>{
        e.preventDefault()
        if (user.password!=user.passwordConfirm){
            alert('comfirm the same ppsword')
            return
        }
        axios
          .post("http://localhost:5000/auth/register", user)
          .then(() => {
            alert("user succcefulyy registered")
            redirect('/auth/login')

    })
          .catch(() => alert("error while registered"));
        console.log(user)
    }
  return (
    <Container>
      <form onSubmit={handlesubmit}>
        <TextField
          label="Username"
          variant="outlined"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          fullWidth
          style={{ marginBottom: "16px" }}
        />
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
        <TextField
          label="Confirm Password"
          variant="outlined"
          value={user.passwordConfirm}
          onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })}
          type="password"
          fullWidth
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          register
        </Button>
      </form>
    </Container>
  );
}
