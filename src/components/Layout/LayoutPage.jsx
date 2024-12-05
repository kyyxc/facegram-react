import { useNavigate } from "react-router-dom";
import { Navbar } from "../Fragments/Navbar";

export function LayoutPage ({ children, user })  {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <Navbar user={user} handleLogout={handleLogout}></Navbar>
      {children}
    </>
  );
};
