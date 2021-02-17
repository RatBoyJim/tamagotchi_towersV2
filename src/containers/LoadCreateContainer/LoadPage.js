import React, {useEffect, useState} from "react";
import DisplayAllCharacters from '../../components/LoadCreateComponents/DisplayAllCharacters'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

const LoadPage = ({selectCurrentCharacter, userData}) => {

  if(!userData[0].animals){
    return (
      <h1>You don't have any animals yet!</h1>
    )
  }


  const characters = userData[0].animals.map((userAnimal) => {
    return (
      <div>
      <div className="animal_container"><div key={userAnimal.id}>
      <DisplayAllCharacters userAnimal={userAnimal} />
      <Link  from="/loadpage" to="/character" >
          <button className="look_after_button" type="button" onClick={() => selectCurrentCharacter(userAnimal.id)}>
              <h6>Look after your pet</h6>
          </button>
      </Link>
      </div>
      <div><img src={userAnimal.speak} alt="animal pic" width="200"/>
    </div></div>
    </div>
    )
  })

  
  

  return(
    <div>
    <h1>Your Pets</h1>
    <div className="load_array_container">
    {characters}
  </div></div>
  )
};

export default LoadPage;