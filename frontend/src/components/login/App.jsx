import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Basket from "./Basket";
import { useRef } from "react";
import CardContainer from "../landing/CardContainer";

export default function App() {
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  const DJANGO_SERVER = "http://127.0.0.1:8000";
  const DJANGO_LOCAL = "http://localhost:8000";


  const loginFunction = (event) => {
      event.preventDefault();
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;


      fetch(DJANGO_LOCAL + "/api/auth/login/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        }).then((resp) => {
            return resp.json();
      }).then((data) => {
          localStorage.setItem("userToken", data.token);
          verifyToken(data.token).then()
          localStorage.setItem("userName", username);
      }).catch((error) => {
          console.error("Error:", error);
      })
      usernameRef.current.value = "";
      passwordRef.current.value = "";
  }

  const verifyToken = async (token) => {
    try {
      const response = await fetch(DJANGO_SERVER + "/api/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Token ${token}`,
        },
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("userId", data.userId);

    } else {

    }
  } catch (error) {
    console.error('Error verifying token:', error);

  }
};

    return (
        <div style={{padding: "20px"}}>
            <div>
                <h3>Login Here</h3>
                <form onSubmit={loginFunction}>
                    <input type="text" id="username" placeholder={"Username"} ref={usernameRef} required/><br/><br/>
                    <input type="password" id="password" placeholder="Enter Password" ref={passwordRef} required/><br/><br/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
}
