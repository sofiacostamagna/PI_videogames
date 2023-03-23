import './App.css';
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreateVideogame from './Components/CreateVideogame/CreateVideogame';
import DetailPage from './Components/DetailPage/DetailPage';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <h1>Henry Videogames</h1>
     
     <Switch>
      <Route exact path= '/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/videogame' component={CreateVideogame} />
      <Route exact path='/videogames/:id' component={DetailPage} />
      
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
