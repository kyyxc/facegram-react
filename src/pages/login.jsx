import { useEffect, useState } from "react";
import { Login } from "../api/auth";
import { NavbarAuth } from "../components/Fragments/NavbarAuth";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [failedLogin, setFailedLogin] = useState("");
  const [failedUsername, setFailedUsername] = useState("");
  const [failedPassword, setFailedPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  },[user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setFailedLogin("");
    setFailedUsername("");
    setFailedPassword("");

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    Login(
      data,
      (err) => {
        if (err) {
          if (err?.errors) {
            if (err?.errors?.username)
              setFailedUsername(err.errors.username[0]);
            if (err?.errors?.password)
              setFailedPassword(err.errors.password[0]);
          } else {
            setFailedLogin(err.message);
          }
        }
      },
      navigate
    );
  };

  return (
    <>
      <NavbarAuth></NavbarAuth>
      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">Login</h5>
                </div>
                <div className="card-body">
                  <form action="" onSubmit={handleLogin}>
                    <div className="mb-2">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                      />
                    </div>
                    {failedUsername && <p>{failedUsername}</p>}
                    <div className="mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                      />
                    </div>
                    {failedPassword && <p>{failedPassword}</p>}
                    {failedLogin && <p>{failedLogin}</p>}
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>
                </div>
              </div>

              <div className="text-center mt-4">
                Don`&#39;`t have account? <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
