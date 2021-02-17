import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
import Loading from "./components/loading";
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

  const [userData, setUserData] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [intervalId, setIntervalId] = useState(null);
  const [hasSelectedCharacter, setHasSelectedCharacter] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [hardDifficulty, setHardDifficulty] = useState(false);
  const [existingUserLoggedIn, setExistingUserLoggedIn] = useState(false);
  const [newUserLoggedIn, setNewUserLoggedIn] = useState(false);
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();

  
  const adoptableAnimals = [
    {animal: "DOG", image: [dogHeart]},
    {animal: "CAT", image: [catMeow]},
    {animal: "MONKEY", image: [monkeySpeak]},
    {animal: "DINOSAUR", image: [dinoRawr]},
    {animal: "UNICORN", image: [unicornRainbow]},
    {animal: "PENGUIN", image: [penguinHeart]}
  ]

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

  const selectCurrentCharacter = (selectedAnimalId) => {
    setCurrentCharacter(userData[0].animals.find(animal => animal.id === selectedAnimalId))
    setHasSelectedCharacter(true)
  }

  const unsetSelectedCharacter = () => {
    setCurrentCharacter({})
    setHasSelectedCharacter(false)
  }

  useEffect(() => {
    reduceStats()
    characterGif()
  }, [ currentCharacter.hunger || currentCharacter.fitness || currentCharacter.cleanliness || currentCharacter.happiness ])

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }



  
  return (
    <Router>
      <>
        <header>
          <h1 id="title">Tamagotchi Towers</h1>
          <NavBar id="navbar"/>
        </header>
        <Switch>
        <Route exact path="/" render={() => isAuthenticated? <Redirect to= "/choicepage" /> : <LandingPage ></LandingPage>} />
        <Route path="/choicepage" render={() => <ChoicePage unsetSelectedCharacter={unsetSelectedCharacter} userDataLoaded={userDataLoaded} setUserData={setUserData} setUserDataLoaded={setUserDataLoaded} />}/>
        
        {/* <Route path="/newuser" render={() => newUserLoggedIn? <Redirect to= "/createpage" /> :<SaveForm logInNewUser={(userDeets) => logInNewUser(userDeets)} />}/> */}
       
       <Route path="/createpage" render={() => hasSelectedCharacter? <Redirect to="/choicepage"/>: <CreatePage allAnimals={adoptableAnimals}
                    setCurrentCharacter={setCurrentCharacter} setHasSelectedCharacter={setHasSelectedCharacter} userData={userData}/>}/>

        <Route path="/loadpage"  render={() => <LoadPage userData = {userData} selectCurrentCharacter={selectCurrentCharacter}/>} />  

        <Route path="/character" render={() => <Character currentCharacter={currentCharacter} currentImage={currentImage} increaseStat={increaseStat} setUserData={setUserData} setCurrentCharacter={setCurrentCharacter} setHasSelectedCharacter={setHasSelectedCharacter} setHardDifficulty={setHardDifficulty} />}/>
        
        </Switch>
      </>
    </Router>
  )

}

export default App;
