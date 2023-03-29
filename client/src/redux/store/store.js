import { createStore, applyMiddleware, compose } from 'redux'; // el createStore crea el store de la API, compose->para componer varias funciones
import thunkMiddleware from 'redux-thunk'; // nos permite manejar actions asincronas en Redux
import reducer from '../reducer/reducer';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS 

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // esta línea es para poder hacer peticiones a un server
);
export default store;
