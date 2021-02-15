import React, {useState} from "react";
import { Link } from "react-router-dom";
import StatBar from "../../components/CharacterComponents/StatBar";




const Character = ({currentCharacter, increaseStat, currentImage, loaded, setLoggedInUsername, setLoggedInPassword, setUserData, setCurrentCharacter, setLoggedIn, setHasSelectedCharacter, setLoaded, setUserDataLoaded, setAnimalDataLoaded, setHardDifficulty, getAllUserData}) => {

    if(loaded === false){
      return <p>Loading...</p>
    }

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

    const logout = (data) => {
      const requestOptions = {
          
          method: 'PUT',
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
          body: JSON.stringify(
            data
          )
      };
      return fetch(`http://localhost:8080/api/animals/${data.id}`, requestOptions)
      .then(setLoggedInUsername())
      .then(setLoggedInPassword())
      .then(setUserData([]))
      .then(setCurrentCharacter({}))
      .then(setLoggedIn(false))
      .then(setHasSelectedCharacter(false))
      .then(setLoaded(false))
      .then(setUserDataLoaded(false))
      .then(setAnimalDataLoaded(false))
      .then(getAllUserData())
    };

    const saveProgress = (data) => {
      const requestOptions = {
          
          method: 'PUT',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify(
            data
          )
      };
      return fetch(`http://localhost:8080/api/animals/${data.id}`, requestOptions)
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