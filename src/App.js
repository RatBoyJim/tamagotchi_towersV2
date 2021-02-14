import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./containers/LandingPageContainer/NavBar";
import LandingPage from "./containers/LandingPageContainer/LandingPage";
import ChoicePage from "./containers/LoadCreateContainer/ChoicePage";
import CreatePage from "./containers/LoadCreateContainer/CreatePage";
import LoadPage from "./containers/LoadCreateContainer/LoadPage";
import Character from "./containers/CharacterContainer/Character";
import dogHeart  from "./gifs/dog/dog_heart.gif"
import catMeow from "./gifs/cat/cat_meow.gif"
import monkeySpeak from "./gifs/monkey/monkey_speak.gif"
import unicornRainbow from "./gifs/unicorn/unicorn_rainbow.gif"
import dinoRawr from "./gifs/dino/dinosaur_rawr.gif"
import penguinHeart from "./gifs/penguin/penguin_heart.gif"
import "./App.css"
import "./style/LandingPage.css"
import "./style/CreatePage.css"
import "./style/CharacterPage.css"
import "./style/ChoicePage.css"
import "./style/LoadPage.css"
import SaveForm from "./components/LoadCreateComponents/SaveForm";




const App = ()=> {

  const [allUserData, setAllUserData] = useState([]);
  const [allAnimalData, setAllAnimalData] = useState([]);
  const [loggedInUsername, setLoggedInUsername] = useState();
  const [loggedInPassword, setLoggedInPassword] = useState();
  const [userData, setUserData] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [hasSelectedCharacter, setHasSelectedCharacter] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [animalDataLoaded, setAnimalDataLoaded] = useState(false);
  const [hardDifficulty, setHardDifficulty] = useState(false);

  
  const adoptableAnimals = [
    {animal: "DOG", image: [dogHeart]},
    {animal: "CAT", image: [catMeow]},
    {animal: "MONKEY", image: [monkeySpeak]},
    {animal: "DINOSAUR", image: [dinoRawr]},
    {animal: "UNICORN", image: [unicornRainbow]},
    {animal: "PENGUIN", image: [penguinHeart]}
  ]

  const getAllUserData = () => {
    console.log("getting all user data");
    return fetch('http://localhost:8080/api/users')
    .then(res => res.json())
    .then(data => setAllUserData(data))
  }

  useEffect(() => {
    getAllUserData();
  }, [])

  const getAllAnimalData = () => {
    console.log("getting animal data");
    return fetch('http://localhost:8080/api/animals')
    .then(res => res.json())
    .then(data => setAllAnimalData(data))
    .then(setAnimalDataLoaded(true))
  }

  useEffect(() => {
    getAllAnimalData();
  }, [])

  const speed = () => {
    if (hardDifficulty === true) {
      return 0.05
    }else{
      return 0.0010
    }
  }

  const reduceStats = () => {
    if (currentCharacter.health>0){
      
      const interval = setInterval(() => {
        currentCharacter.health = (currentCharacter.happiness + currentCharacter.fitness + currentCharacter.cleanliness + currentCharacter.hunger)/4;
        setIntervalId(interval)
        });
    }
    if (currentCharacter.happiness>0){
      
    const interval = setInterval(() => {
      currentCharacter.happiness -= currentCharacter.cheeriness*speed();
      setIntervalId(interval)
      if(currentCharacter.happiness === 0) {
        
    }}, 10);
  }
  if (currentCharacter.cleanliness>0){
      
    const interval = setInterval(() => {
      
      currentCharacter.cleanliness -= currentCharacter.grooming*speed();
      setIntervalId(interval)
      if(currentCharacter.cleanliness === 0) {
        
    }}, 10);
  }
  if (currentCharacter.hunger>0){
      
    const interval = setInterval(() => {
      currentCharacter.hunger -= currentCharacter.appetite*speed();
      setIntervalId(interval)
      if(currentCharacter.hunger === 0) {
        
    }}, 10);
  }
  if (currentCharacter.fitness>0){
      
    const interval = setInterval(() => {
      currentCharacter.fitness -=currentCharacter.activityLevel*speed();
      setIntervalId(interval)
      if(currentCharacter.fitness === 0) {
    }}, 10);
  }
  }

  clearInterval(intervalId);

  const increaseStat = (stat) => {
    if (currentCharacter[stat]<95){
      currentCharacter[stat] += 5;
    }
    else (currentCharacter[stat] = 100)
  }
  
  const characterGif = () => {
    if (currentCharacter){

      if (currentCharacter.health<1){
        setCurrentImage(currentCharacter.rip)
      }
      else if (currentCharacter.hunger<2){
        setCurrentImage(currentCharacter.rip)
      }
      else if (currentCharacter.health<50){
        setCurrentImage(currentCharacter.exclamation)
      } 
      else if (currentCharacter.health<80){
        setCurrentImage(currentCharacter.speak)
      } 
      else{
        setCurrentImage(currentCharacter.heart)
      }  
    }
  }

  const handleSubmit = (data) => {
    allUserData.forEach(element => {
      if (element.userName === data.username && element.password === data.password){
        console.log("Success");
        setLoggedInUsername(data.username)
        setLoggedInPassword(data.password)
        setLoggedIn(true);
        getUserData()
        setLoggedIn(true)
        setUserDataLoaded(true)
      }else{
        console.log("Failure");
      }
    });
  }

  const getUserData = () => {
    console.log("getting user data");
    console.log("NAME IS" + loggedInUsername)
    return fetch(`http://localhost:8080/api/users?username=${loggedInUsername}`)
    .then(res => res.json())
    .then(data => setUserData(data))
    .then(setUserDataLoaded(true))
    
  }

  useEffect(() => {
    getUserData();
  }, [loggedInUsername && loggedInPassword || hasSelectedCharacter===true])

  const selectCurrentCharacter = (characterId) => {
    setCurrentCharacter(allAnimalData.find(animal => animal.id === characterId))
    setHasSelectedCharacter(true)
  }

  const unsetSelectedCharacter = () => {
    setCurrentCharacter({})
    setHasSelectedCharacter(false)
  }

  useEffect(() => {
    if (loggedIn===true){
    reduceStats()
    characterGif()
    }
  }, [ currentCharacter.hunger || currentCharacter.fitness || currentCharacter.cleanliness || currentCharacter.happiness ])

  const logInNewUser = (userDeets) => {
    setLoggedInUsername(userDeets.username);
    setLoggedInPassword(userDeets.password);
    setLoggedIn(true);
  }



  
  return (
    <Router>
      <>
        <header>
          <h1 id="title">Tamagotchi Towers</h1>
          <NavBar id="navbar"/>
        </header>
        <Switch>
        <Route exact path="/" render={() => loggedIn? <Redirect to= "/choicepage" /> : <LandingPage onSubmit = {handleSubmit}></LandingPage>} />
        <Route path="/choicepage" render={() => <ChoicePage unsetSelectedCharacter={unsetSelectedCharacter} userDataLoaded={userDataLoaded}/>}/>
        
        <Route path="/newuser" render={() => loggedIn? <Redirect to= "/createpage" /> :<SaveForm logInNewUser={(userDeets) => logInNewUser(userDeets)} />}/>
       
       <Route path="/createpage" render={() => hasSelectedCharacter? <Redirect to="/choicepage"/>: <CreatePage allAnimals={adoptableAnimals}
                    setCurrentCharacter={setCurrentCharacter} setHasSelectedCharacter={setHasSelectedCharacter} getUserData={getUserData} userData={userData} setLoaded={setLoaded} userDataLoaded={userDataLoaded} getAllAnimalData={getAllAnimalData}/>}/>

        <Route path="/loadpage"  render={() => <LoadPage userAnimals={userData[0] !== undefined ? userData[0].animals : undefined} selectCurrentCharacter={selectCurrentCharacter} getUserData={getUserData} getAllAnimalData={getAllAnimalData} setLoaded={setLoaded} loaded={loaded} animalDataLoaded={animalDataLoaded}/>} />

        <Route path="/character" render={() => <Character currentCharacter={currentCharacter} currentImage={currentImage} increaseStat={increaseStat} loaded={loaded} setLoggedInUsername={setLoggedInUsername} setLoggedInPassword={setLoggedInPassword} setUserData={setUserData} setCurrentCharacter={setCurrentCharacter} setLoggedIn={setLoggedIn} setHasSelectedCharacter={setHasSelectedCharacter} setLoaded={setLoaded} setUserDataLoaded={setUserDataLoaded} setAnimalDataLoaded={setAnimalDataLoaded} setHardDifficulty={setHardDifficulty} getAllUserData={getAllUserData}/>}/>
        
        </Switch>
      </>
    </Router>
  )

}

export default App;

{/* <Route exact path="/" render={() => loggedIn? <Redirect to= "/choicepage" /> : <LandingPage onSubmit = {handleSubmit}></LandingPage>} />
        <Route path="/choicepage" render={() => <ChoicePage unsetSelectedCharacter={unsetSelectedCharacter} userDataLoaded={userDataLoaded} userData={userData}/>}/>
        
        <Route path="/newuser" render={() => loggedIn? <Redirect to= "/choicepage" /> :<SaveForm logInNewUser={(userDeets) => logInNewUser(userDeets)} currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} userData={userData} loggedInUsername={loggedInUsername} setLoggedInPassword={loggedInPassword} getUserData={getUserData} setLoaded={setLoaded}/>}/>
       
       <Route path="/createpage" render={() => hasSelectedCharacter? <Redirect to="/loadpage"/>: <CreatePage allAnimals={adoptableAnimals}
                    setCurrentCharacter={setCurrentCharacter} setHasSelectedCharacter={setHasSelectedCharacter} getUserData={getUserData} userData={userData} setLoaded={setLoaded} userDataLoaded={userDataLoaded} getAllAnimalData={getAllAnimalData}/>}/> */}
