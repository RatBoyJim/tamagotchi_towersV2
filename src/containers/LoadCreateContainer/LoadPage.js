import React, {useEffect, useState} from "react";
import DisplayAllCharacters from '../../components/LoadCreateComponents/DisplayAllCharacters'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

const LoadPage = ({userAnimals, selectCurrentCharacter, getUserData, getAllAnimalData, setLoaded, loaded, animalDataLoaded}) => {


  useEffect(() => {
    getUserData()
    setLoaded(true)
  }, [])

  useEffect(() => {
    getAllAnimalData()
  }, [])

  if(!userAnimals){
    return (
      <h1>You don't have any animals yet!</h1>
    )
  }

  if (loaded === false){
      return(
        <img src="../src/gifs/loading.gif" alt=""/>
      )
    }

    if(animalDataLoaded === false){
      return <p>Loading....</p>
    }


  const characters = userAnimals.map((animal) => {
    return (
      // <div>
      <div className="animal_container"><div key={animal.id}>
      <DisplayAllCharacters animal={animal} />
      <Link  from="/loadpage" to="/character" >
          <button className="look_after_button" type="button" onClick={() => selectCurrentCharacter(animal.id)}>
              <h6>Look after your pet</h6>
          </button>
      </Link>
      </div>
      <div><img src={animal.speak} alt="animal pic" width="200"/>
    </div></div>
    // </div>
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