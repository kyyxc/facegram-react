import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { HomePage } from "./pages/home";
import { ProfilePage } from "./pages/profile";
import { CreatePostPage } from "./pages/create";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/profile/:username" element={<ProfilePage />}></Route>
        <Route path="/create" element={<CreatePostPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
