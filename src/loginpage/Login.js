import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AdminPage from "../pages/adminPage";
import axios from "axios";
import { authLogin, getUser } from "../config/api";
import './Login.css';
import img from "../loginpage/background.jpg";

const LoginNew = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    if (token !== null) {
      onLogin(token);
    }
  }, []);

  const handelLogout = () => {
    Swal.fire("", "Logout", "success");
    setIsLogin(false);
    sessionStorage.clear();
  };

  const onLogin = (token) => {
    setIsLogin(true);
    sessionStorage.setItem("auth-token", token);
  };

  const handleSubmit = () => {
    const Login = {
      user_email: username,
      user_password: password,
    };
    authLogin(Login)
      .then((res) => {
        if (res.user.user_level == 1) {
          Swal.fire("", "berhasil login", "success");
          onLogin(res.token);
        } else {
          console.log("error");
          Swal.fire("", "username dan password salah", "error");
        }
      })
      .catch((e) => {
        Swal.fire("", "username dan password salah", "error");
        console.log(e);
      });
  };
  const changeUsername = (event) => {
    setUserName(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      {isLogin ? (
        <AdminPage logOut={handelLogout} />
      ) : (
        <div class="hold-transition login-page">
          <div class="login-box">
            <div class="login-logo">
              <a href="#">
                <b style={{fontFamily:"'Lora'", color:"#f9ff27",fontSize:"65px", fontStyle:"bold", marginTop:"130px"}}>  Eat & Fit</b> 
              </a>
            </div>
            <div class="card" style={{alignContent:"center", borderRadius: "100px", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.1)"}}>
              <h5 class="card-header info-color white-text text-center py-4" style={{backgroundColor:"#feb21b"}}>
                <strong style={{fontFamily:"Lora", color:"maroon", fontSize:"30px"}}>Login Admin</strong>
              </h5>
              <div class="card-body px-lg-5 login-card-body">
                <div class="input-group mb-3" style={{fontFamily:"PT Serif"}}>
                  <input
                    type="text"
                    class="form-control"
                    name="username"
                    placeholder="Username"
                    onChange={changeUsername}
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div class="input-group mb-3"  style={{fontFamily:"PT Serif"}}>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={changePassword}
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div class="row"  >
                    <button
                      style={{fontFamily:"PT Serif", fontSize:"20px"}}
                      type="submit"
                      class="btn btn-outline-warning btn-rounded btn-block z-depth-0 my-4 warning-effect"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginNew;
