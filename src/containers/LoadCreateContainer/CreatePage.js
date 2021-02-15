import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";


const CreatePage = ({allAnimals, userData, setHasSelectedCharacter, getUserData, setLoaded, userDataLoaded, getAllAnimalData}) => {

  

  const [formData, setFormData] = useState({
    name: '',
    animaltype: ''
  });


  const handleClick = (animal) => {
    formData.animaltype = animal.animal
  }

  const handleChange = (event) => {
    const newState = {...formData};
    newState[event.target.name] = event.target.value;
    setFormData(newState);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    saveNewAnimal(formData)
    getUserData()
    getAllAnimalData()
  }

  

  const animalArray = allAnimals.map((animal) => {
    return(
    <div key={animal.id}>
      <div className="animal_container">
        <p className="animal_type">{animal.animal} </p>
        <img src={animal.image[0]} alt="animal pic" width="200"></img>
        <button id="choose_animal_button" onClick={() => handleClick(animal)} >Adopt</button>
      </div>
      
      </div>
    )
})



const saveNewAnimal = (data) => {
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
        animalName: data.name,
        animalType: data.animaltype,
        health: 100,
        happiness: 100,
        cleanliness: 100,
        fitness: 100,
        hunger: 100,
        user: {
          id: userData[0].id,
          userName: userData[0].userName,
          password: userData[0].password,
          imageURL: userData[0].imageURL}
      })
  };
  return fetch('http://localhost:8080/api/animals', requestOptions)
  .then(setHasSelectedCharacter(true))
  .then(() => setLoaded(true))
  .then(getUserData())
  
  
}

if(userDataLoaded === false){
  return <p>Loading....</p>
}

  
  

  return(
    <>
    <p id="instruction"> <b>Select a Tamagotchi you would like to adopt and give it a name below! </b></p>
    <div className="animal_array_container">
        {animalArray}
    </div>
    <div className="link_container">
  
      <form>
        <label htmlFor="name"></label>
          <input 
            className="create_page_input"
            onChange={handleChange}
            name="name"
            id="name"
            type="text"
            value={formData.name}
            placeholder="Enter name"/>
          <input type="hidden" id="animaltype" name="animaltype" value={formData.animaltype} onChange={handleChange}></input>
          <input className="create_page_input" type="submit" value="Look after this pet" onClick={handleSubmit}/>
        </form>
    </div>
    </>
      )
};
// button type="button" onClick={() => selectCurrentCharacter(animal.id)}

export default CreatePage;