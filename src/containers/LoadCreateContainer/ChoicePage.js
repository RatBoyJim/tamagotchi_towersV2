import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./../../components/loading"

const ChoicePage = ({unsetSelectedCharacter, setUserData, userData}) => {

  const { user } = useAuth0();
  const { name, picture, email } = user;
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    unsetSelectedCharacter();
    checkIfNewUser();
  }, [])


  const getUserData = async () => {
    console.log("getting user data");
    console.log("NAME IS " + email)
    return await fetch(`https://mysterious-dawn-00518.herokuapp.com/api/users?username=${email}`)
    .then(res => res.json())
    .then(data => setUserData(data))
    .then(() => console.log("user data gotten"))
  }

  const callApi = async () => {

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
            userName: email,
            password: "not used",
            imageURL: "fakeImgUrl",
            animals: []
            })
        };
        return await fetch('https://mysterious-dawn-00518.herokuapp.com/api/users', requestOptions)
        .then(() => getUserData())
    }

  const checkIfNewUser = () => {
    if (userData[0]) {
      console.log("existing user");
      getUserData();
    } else {
      console.log("saving new user");
      callApi();
    }
  }


 

  return (
  <div className="choice_page_div">
    <h4>Create or Load</h4>
    
    <p>Choose whether to create a new Tamagotchi or load a previously saved Tamagotchi by clicking one of the buttons below</p>
    <br></br>
    <div className="button_container">
    <Link style={{ textDecoration: 'none' }}  from="/choicepage" to="/createpage">
    <img id="egg_gif" className="load_create_gifs" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/43a14ae7-38bd-4670-a62a-c0b84942569f/d9o16fj-2b31e422-d0dc-4a85-9f83-c08e396af9d5.gif"/>
    <h3 className="create_text">Create</h3>
    </Link>
    <Link style={{ textDecoration: 'none' }} id="load_gif" from="/choicepage" to="/loadpage">
    <img className="load_create_gifs" src="https://i.imgur.com/xIQUqsa.gif"/>
    <h3 className="load_text">Load</h3>
    </Link>
    </div>
  </div>
  )};

  export default withAuthenticationRequired(ChoicePage, {
    onRedirecting: () => <Loading />,
  });