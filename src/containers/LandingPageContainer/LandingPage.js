import React, {useState} from "react";
import LoginButton from '../../components/login-button'
import SignupButton from '../../components/signup-button'

const LandingPage = ({}) => {
  return (
<>
  <div id="welcome_message">
    <h2>Welcome to our magical home!</h2>
  </div>
  <br></br>
  <div className="page_container">

    <br></br>
    <div className="left_side">
      <img src="https://i.imgur.com/chKjcRm.gif"/>
    </div>
    <div className="right_side">
      <LoginButton></LoginButton>
      <br></br>
      <SignupButton></SignupButton>
    </div>
  </div>
</>
)};

export default LandingPage;