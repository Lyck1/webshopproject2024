import { useRef } from "react";


export default function App() {
  let usernameRef = useRef(null);
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  const DJANGO_LOCAL = "http://localhost:8000";


  const signupFunction = (event) => {
      event.preventDefault();
      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      fetch(DJANGO_LOCAL + "/api/auth/register/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ username: username, email: email, password: password }),
        }).then((resp) => {
            return resp.json();
      }).then((data) => {
          localStorage.setItem("userToken", data.token);
      }).catch((error) => {
          console.error("Error:", error);
      })
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
  }

    return (
        <div style={{padding: "20px"}}>
            <div>
                <h3>Create your account here</h3>
                <h4>Then proceed to login</h4>
                <form onSubmit={signupFunction}>
                    <input type="text" id="username" placeholder={"Enter Username"} ref={usernameRef} required/><br/><br/>
                    <input type="email" id="email" placeholder="Enter Email" ref={emailRef} required/><br/><br/>
                    <input type="password" id="password" placeholder="Enter Password" ref={passwordRef} required/><br/><br/>
                    <input type="submit" value="Create Account"/>
                </form>
            </div>
        </div>
    )
}
