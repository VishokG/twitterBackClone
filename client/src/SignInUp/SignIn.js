import React from "react";
import axios from "axios";
import qs from "qs";
import "./regLogin.css";
import { useNavigate } from "react-router-dom";

function SignIn(props) {

  let navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    };

    axios
      .post('http://localhost:5000/logIn', user)
      .then(response => {
        if(response.data.status === "ok") {
          props.checkLoggedIn(true, {username: response.data.username, handle: response.data.handle});
        }
      })
      .catch(err => {
        console.error(err);
      });
    // var data = qs.stringify(user);
    // var config = {
    //   method: "post",
    //   url: "http://localhost:5000/logIn",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   data: data,
    // };

    // console.log(data);

    // axios(config)
    //   .then(async function (response) {
    //     console.log(JSON.stringify(response.data));
    //     if (response.data.status === "ok") {
    //       props.checkLoggedIn(true, response.data);
    //       navigate('/');
    //     } else {
    //       alert("Please check your username and password");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <div class="container outerBody">
      <div class="row">
        <div class="col-md-5 mx-auto">
          <div id="first">
            <div class="myform form ">
              <div class="logo mb-3">
                <div class="col-md-12 text-center">
                  <h1 className="heads">Login</h1>
                </div>
              </div>
              <form
                method="post"
                name="login"
                onSubmit={onSubmit}
                onChange={onChange}
              >
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
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
                  <label for="exampleInputEmail1">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                </div>
                <div class="form-group">
                  <p class="text-center">
                    By signing up you accept our <a href="#">Terms Of Use</a>
                  </p>
                </div>
                <div class="col-md-12 text-center ">
                  <button
                    type="submit"
                    class=" btn btn-block mybtn btn-primary tx-tfm"
                  >
                    Login
                  </button>
                </div>
                <div class="col-md-12 ">
                  <div class="login-or">
                    <hr class="hr-or" />
                    <span class="span-or">or</span>
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <p class="text-center">
                    <a href="javascript:void();" class="google btn mybtn">
                      <i class="fa fa-google-plus"></i> Signup using Google
                    </a>
                  </p>
                </div>
                <div class="form-group">
                  <p class="text-center">
                    Don't have account?{" "}
                    <a href="/signUp" id="signup">
                      Sign up here
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

export default SignIn;
