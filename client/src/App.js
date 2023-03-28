//ARCHIVOS PRINCIPAL DE  LA API REACT -> DEFINE LAS RUTAS Y COMPONENTES QUE UTILIZARE EN LA API

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandigPage from './Components/LandigPage/LandigPage.jsx';
import Home from './Components/Home/Home';
import CreateVideogame from './Components/CreateVideogame/CreateVideogame';
import Detail from './Components/DetailPage/Detail';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
     
     
    
      <Route exact path= '/' component={LandigPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/videogame' component={CreateVideogame} />
      <Route exact path='/videogames/:id' component={Detail} />
      
      
   
    </div>
    </BrowserRouter>
  );
}

export default App;
