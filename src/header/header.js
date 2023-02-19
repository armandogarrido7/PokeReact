import { Link } from "react-router-dom";
import './header.css'
function AppHeader(){
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-light">
              <div className="container-fluid justify-content-between navbar-bar">
                <Link to="/"><img className="header_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"/></Link>    
                <h2 className="title">PokeReact</h2>
                <div className="d-flex justify-content-between">
                    <Link to="/play" className="nav-link"><i className="fa-solid fa-gamepad fa-xl"></i></Link>
                    <Link to="/pokemons" className="nav-link"><i className="fa-solid fa-book fa-xl mx-3"></i></Link>
                    <Link to="/login" className="nav-link"><i className="fa-solid fa-user fa-xl"></i></Link>
                </div>
              </div>
            </nav>
                
        </header>
    );
}


export default AppHeader;