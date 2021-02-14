import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

const SaveForm = ({logInNewUser}) => {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleUsernameChange = (evt) => {
        setNewUsername(evt.target.value);
    };

    const handlePasswordChange = (evt) => {
        setNewPassword(evt.target.value);
    };

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        const usernameToSubmit = newUsername.trim();
        const passwordToSubmit = newPassword.trim();
        saveNewUser(usernameToSubmit, passwordToSubmit); 
        
        
        // setNewUsername("");
        // setNewPassword("");
    }

    const saveNewUser = (usernameToSubmit, passwordToSubmit) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              userName: newUsername,
              password: newPassword,
              imageURL: "fakeImgUrl",
              animals: []
            })
        };
        return fetch('http://localhost:8080/api/users', requestOptions)
            .then(() => logInNewUser({
                username: usernameToSubmit,
                password: passwordToSubmit
            }))
            .then(setNewUsername(""))
            .then(setNewPassword(""))
      }


    return(
        <>
        <p>If you would like to create a pet please provide a username and password in the form below</p>
       
        <form className="comment-form" onSubmit={handleFormSubmit}>
            <input className="new_user_button" type="text"
            placeholder="Your username"
            value={newUsername}
            onChange={handleUsernameChange}/>
            

            <input className="new_user_button" type="password"
            placeholder="Your password"
            value={newPassword}
            onChange={handlePasswordChange}/>

            <input className="new_user_button" type="submit"
            value="Create Account and Log in"/>
        </form>
        {/* <Link  from="/newuser" to="/createpage">
            <button type="button">
                Create a new pet
            </button>
        </Link> */}
        </>
    )
};

export default SaveForm;