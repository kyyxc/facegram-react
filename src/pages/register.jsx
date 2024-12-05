import { Link, useNavigate } from "react-router-dom";
import { NavbarAuth } from "../components/Fragments/NavbarAuth";
import { Register } from "../api/auth";
import { useEffect, useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [failedRegister, setFailedRegister] = useState("");
  const [failedUsername, setFailedUsername] = useState("");
  const [failedFullname, setFailedFullname] = useState("");
  const [failedPassword, setFailedPassword] = useState("");
  const [failedBio, setFailedBio] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  },[user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    setFailedFullname("");
    setFailedUsername("");
    setFailedPassword("");
    setFailedBio("");

    const data = {
      full_name: e.target.full_name.value,
      username: e.target.username.value,
      password: e.target.password.value,
      bio: e.target.bio.value,
      is_private: e.target.is_private.checked,
    };

    Register(
      data,
      (err) => {
        if (err) {
          if (err?.errors) {
            if (err?.errors?.full_name)
              setFailedFullname(err.errors.full_name[0]);
            if (err?.errors?.username)
              setFailedUsername(err.errors.username[0]);
            if (err?.errors?.password)
              setFailedPassword(err.errors.password[0]);
            if (err?.errors?.bio) setFailedBio(err.errors.bio[0]);
          } else {
            setFailedRegister(err.message);
          }
        }
      },
      navigate
    );
  };
  return (
    <div>
      <NavbarAuth></NavbarAuth>
      <main className="mt-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                  <h5 className="mb-0">Register</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleRegister}>
                    <div className="mb-2">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="full_name"
                        name="full_name"
                      />
                    </div>
                    {failedFullname && <p>{failedFullname}</p>}
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
                    <div className="mb-3">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        name="bio"
                        id="bio"
                        cols="30"
                        rows="3"
                        className="form-control"
                      ></textarea>
                    </div>
                    {failedBio && <p>{failedBio}</p>}
                    {failedRegister && <p>{failedRegister}</p>}
                    <div className="mb-3 d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_private"
                        name="is_private"
                      />
                      <label htmlFor="is_private">Private Account</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Register
                    </button>
                  </form>
                </div>
              </div>

              <div className="text-center mt-4">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
