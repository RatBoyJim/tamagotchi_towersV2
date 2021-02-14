import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

const LandingPage = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const newState = {...formData};
    newState[event.target.name] = event.target.value;
    setFormData(newState);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

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
    <form>
      <div className="form_wrap">
        <p>Username</p>
        <label htmlFor="username"></label>
        <input
          onChange={handleChange}
          name="username"
          id="username"
          type="text"
          value={formData.username} />
      </div>

      
      <div className="form_wrap">
        <p>Password</p>
        <label htmlFor="password"></label>
        <input
          onChange={handleChange}
          name="password"
          id="password"
          type="password"
          value={formData.password} />
      </div>
      <div className="form_wrap">
        <input onClick={handleSubmit} type="submit" value="Log In" />
      </div>
    </form>
    
 
 
    <Link className="form_wrap" style={{ textDecoration: 'none' }} from="/" to="/newuser">
      <button type="button">
          I'm new here!
      </button>
    </Link>
    </div>



  </div>
  </>
  
  )};

export default LandingPage;