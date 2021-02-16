import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const SaveForm = ({logInNewUser}) => {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { user } = useAuth0();
    const { name, picture, email } = user;
    const { getAccessTokenSilently } = useAuth0();
    

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
        callApi(usernameToSubmit, passwordToSubmit); 
        
        
        // setNewUsername("");
        // setNewPassword("");
    }


    const callApi = async (usernameToSubmit, passwordToSubmit) => {

        const token = await getAccessTokenSilently();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            data: {
                grant_type: 'client_credentials',
                client_id: 'h4QURbaQAF10gmmAwXE6fje3N4ZTchki',
                client_secret: 'bpXbKh0yAu5BD1UvcSZLxdmBsy8oa3y_dEE_w3X3aZEEwkDq6CH6-4sLmvDHAxV0',
                audience: 'http://localhost:8080/api'
            },
            body: JSON.stringify({ 
                userName: usernameToSubmit,
                password: passwordToSubmit,
                imageURL: "fakeImgUrl",
                animals: []
                })
            };
            return await fetch('http://localhost:8080/api/users', requestOptions)
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