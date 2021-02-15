import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const SaveForm = ({logInNewUser}) => {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { user } = useAuth0();
    const { name, picture, email } = user;

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

    const saveNewUser = (usernameToSubmit, passwordToSubmit, email) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVkSldza3pSanB0dzNZQmp0OXhJdSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wd3o0b2tibi5ldS5hdXRoMC5jb20vIiwic3ViIjoiaDRRVVJiYVFBRjEwZ21tQXdYRTZmamUzTjRaVGNoa2lAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkiLCJpYXQiOjE2MTMzOTUyNDQsImV4cCI6MTYxMzQ4MTY0NCwiYXpwIjoiaDRRVVJiYVFBRjEwZ21tQXdYRTZmamUzTjRaVGNoa2kiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.BWKd9wTPl0DjW3iBKeObjiPuH7ZjREhxg0nxMSRJcyNHQaKLz8d8vWBw_9h_KmZil4g9XLs1Jf9FFonv7Wuy0EyAsWJKHEpJvw1qZ7JSmgV5TQCeuxRgExNOIByKEv0Ew45sq-K4wE35fbUKa5YlVh9_EUM0mtB_iQ4Gz8E-d1yW1tOoUeu8rQITDuNqEuuw2aRSTZq-Wr4-qsaOxQSR7uA0ThFmJRABCh7_WWSVKS59jzyrzbbikeZrL3ehL47Oy_ONtcoBVAx3D4N35DGD1g5bIPx5H3TdtwgUUyApcrI_DSg0CWgn2XyKcTyqZwgr26BNqWUcCXtTeXLxilVN5w'
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