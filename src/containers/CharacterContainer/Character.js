import React, {useState} from "react";
import { Link } from "react-router-dom";
import StatBar from "../../components/CharacterComponents/StatBar";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";




const Character = ({currentCharacter, increaseStat, currentImage, setUserData, setCurrentCharacter, setHasSelectedCharacter, setLoaded, setHardDifficulty}) => {

    const { getAccessTokenSilently } = useAuth0();

    const setHard = () => {
      // Get the checkbox
  var checkBox = document.getElementById("myCheck");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    setHardDifficulty(true)
  } else {
    setHardDifficulty(false)
  }
    }

    const logout = async (data) => {

      const token = await getAccessTokenSilently();

      const requestOptions = {
          
          method: 'PUT',
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
          body: JSON.stringify(
            data
          )
      };
      return await fetch(`http://localhost:8080/api/animals/${data.id}`, requestOptions)
      .then(setUserData([]))
      .then(setCurrentCharacter({}))
      .then(setHasSelectedCharacter(false))
    };

    const saveProgress = async (data) => {

      const token = await getAccessTokenSilently();

      const requestOptions = {
          
          method: 'PUT',
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
          body: JSON.stringify(
            data
          )
      };
      return await fetch(`http://localhost:8080/api/animals/${data.id}`, requestOptions)
      .then(setCurrentCharacter({}))
      .then(setHasSelectedCharacter(false))
    };

    return(
        <div className="character_sheet">
          <div className="left_side_character">
            <div className="card">
                <h4>
                {currentCharacter.animalName}
                </h4>
                <p><h6>Species: {currentCharacter.animalType}</h6></p>
                <img src={currentImage} alt="animal pic" width="200"></img>
            </div>
          <br></br>
          <p>Hard Mode</p>
          <label className="switch">
            <input type="checkbox" id="myCheck" onClick={setHard}></input>
            <span className="slider round"></span>
          </label>
          </div>
          <div className="right_side_character">
            <StatBar stat={currentCharacter.health} statName="Health"
              increaseStat={increaseStat}/>
            <StatBar stat={currentCharacter.happiness} statName="Happiness" 
            buttonLabel="Play with" increaseStat={increaseStat} />
            <StatBar stat={currentCharacter.cleanliness} statName="Cleanliness"
              increaseStat={increaseStat} buttonLabel="Put in the bath"/>
            <StatBar stat={currentCharacter.fitness} statName="Fitness"
              increaseStat={increaseStat} buttonLabel="Take for walk"/>
            <StatBar stat={currentCharacter.hunger} statName="Hunger"
              increaseStat={increaseStat} buttonLabel="Feed"/>
          <br/>
          
          <div className="save_button_div">
          <Link  from="/character" to="/" >
          <button className="save_button" type="button" onClick={() => logout(currentCharacter)}>
              Save and log out
          </button>
          </Link>
          <Link  from="/character" to="/choicepage" >
          <button className="save_button" type="button" onClick={() => saveProgress(currentCharacter)}>
              Save progress!
          </button>
          </Link>
          </div>
          </div>
        
        </div>
    )
  };
  
  export default Character;