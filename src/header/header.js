import { Link } from "react-router-dom";
import './header.css';
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function AppHeader(){
  const [userID, setUserID] = useState("");

  const navigate = useNavigate();

    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserID(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
    }, []);

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            setUserID("");
        }).catch((error) => {
        // An error happened.
        });
    }
    return (
        <header>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid align-items-bottom">
            <Link to="/"><img className="header_logo navbar-brand" alt="header_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"/></Link>
            <h2 className="title navbar-text">PokeReact</h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/play" className="nav-link"><i className="fa-solid fa-gamepad fa-xl"></i></Link>
                </li>
                <li className="nav-item">
                  <Link to="/pokemons" className="nav-link"><i className="fa-solid fa-book fa-xl mx-3"></i></Link>
                </li>
                <li className="nav-item">
                {userID ? (
                              <Link to="/" className="nav-link" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket fa-xl"></i></Link>
                            ) : (
                              <Link to="/login" className="nav-link"><i className="fa-solid fa-user fa-xl"></i></Link>
                            )}        </li>
              </ul>
            </div>
          </div>
          </nav>
            <nav className="navbar navbar-expand-sm navbar-dark bg-light">
              <div className="container-fluid justify-content-between navbar-bar">
                <div className="d-flex justify-content-between">                    
                </div>
              </div>
            </nav>
                
        </header>
    );
}


export default AppHeader;