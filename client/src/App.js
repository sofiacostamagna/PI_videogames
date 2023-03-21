import './App.css';
import { Route } from 'react-router-dom';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Paginado from './Components/Paginado/Paginado';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <h1>Henry Videogames</h1>
     
     <Switch>
      <Route exact path= '/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
