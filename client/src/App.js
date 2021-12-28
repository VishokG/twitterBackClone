import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignInUp/SignIn";
import SignUp from "./SignInUp/SignUp";
import "./App.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import UserContext from './UserContext';

function App() {

  const [loggedIn, setLoggedin] = useState(false);
  const userData = useRef({}); 

    function checkLoggedIn(b, data) {
      if(b) {
        userData.current = data;
      }
      setLoggedin(b);
    }

  React.useEffect(() => {
    
  });

  if(loggedIn) {
    return (
      <div className="app">
      <Sidebar/>
          <Feed userData={userData.current}/>
      <Widgets/>
      </div>
    );
  } 
  else {  
    
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/signIn" element={<SignIn checkLoggedIn={checkLoggedIn} />} />
          <Route path="/" element={<Navigate to="/signUp" />} />
          <Route path="/signUp" element={<SignUp checkLoggedIn={checkLoggedIn}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
}

export default App;
