import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "../auth/register/register.jsx";
import Login from "../auth/login/login.jsx";
import Forget from "../auth/forget/forget.jsx";
import ResetPassword from "../auth/reset/sendreset.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/forget/password" element={<Forget />} />
        <Route path="/reset/password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
