import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./Redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 bg-light">
      <div
        className="card shadow px-4"
        style={{ width: "100%", maxWidth: "300px" }}
      >
        <h4 className="text-center my-4">Login</h4>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p
          style={{ fontSize: "12px" }}
          className="d-flex justify-content-center mt-2"
        >
          New here?{" "}
          <p className="ms-1" >
         <Link style={{textDecoration:'none', color: "red"}} to='/register'> Create Account</Link>  
          </p>
        </p>
      </div>
    </div>
  );
};

export default Login;
