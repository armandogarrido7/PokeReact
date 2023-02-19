import './App.css';
import AppHeader from './header/header';
import AppFooter from './footer/footer';
import Home from './home/home';
import Pokemons from './pokemons/pokemons';
import Play from './play/play';
import Login from './login/login';
import PokemonDetails from './pokemonDetails/pokemonDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    return ( 
      <div className="App">
        <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="pokemons" element={<Pokemons/>}></Route>
          <Route path="/pokemon/:pokemonName" element={<PokemonDetails/>}></Route>
          <Route path="play" element={<Play/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        </Routes>
        <AppFooter/>
      </BrowserRouter>
    </div>
  );
}

export default App;