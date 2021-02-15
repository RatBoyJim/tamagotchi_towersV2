import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./../../components/loading"

const ChoicePage = ({unsetSelectedCharacter, userDataLoaded}) => {

  const { user } = useAuth0();
  const { name, picture, email } = user;

  useEffect(() => {
    unsetSelectedCharacter();
  }, [])


  if(userDataLoaded===false){
    return <p>Loading....</p>
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
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  </div>
  )};

  export default withAuthenticationRequired(ChoicePage, {
    onRedirecting: () => <Loading />,
  });