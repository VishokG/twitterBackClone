import React, { useContext } from "react";
import axios from "axios";
import qs from "qs";
import "./regLogin.css";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  let navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    username: "",
    handle: "",
  });

  const { name, email, password, username, handle } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      username,
      handle,
    };

    axios
      .post("http://localhost:5000/register", newUser)
      .then(response => {
        if(response.data.status === "ok") {
          props.checkLoggedIn(true, {username: response.data.username, handle: response.data.handle});
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div class="container outerBody">
      <div class="row">
        <div class="col-md-5 mx-auto">
          <div id="first">
            <div class="myform form ">
              <div class="logo mb-3">
                <div class="col-md-12 text-center">
                  <h1 className="heads">Sign Up</h1>
                </div>
              </div>
              <form
                method="post"
                name="login"
                onSubmit={onSubmit}
                onChange={onChange}
              >
                <div class="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                  <div class="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      class="form-control"
                      id="username"
                      aria-describedby="usernameHelp"
                      placeholder="Enter Username"
                    />
                  </div>
                  <div class="form-group">
                    <label>Handle</label>
                    <input
                      type="text"
                      name="handle"
                      class="form-control"
                      id="handle"
                      aria-describedby="handleHelp"
                      placeholder="Enter Handle"
                    />
                  </div>
                </div>
                <div class="col-md-12 text-center ">
                  <button
                    type="submit"
                    class=" btn btn-block mybtn btn-primary tx-tfm"
                  >
                    Sign Up
                  </button>
                </div>
                <div class="col-md-12 "></div>
                <div class="col-md-12 mb-3"></div>
                <div class="form-group">
                  <p class="text-center">
                    Already have an account?{" "}
                    <a href="/signIn" id="signup">
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
