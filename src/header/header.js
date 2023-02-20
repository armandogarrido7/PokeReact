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
            <nav className="navbar navbar-expand-sm navbar-dark bg-light">
              <div className="container-fluid justify-content-between navbar-bar">
                <Link to="/"><img className="header_logo" alt="header" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"/></Link>    
                <h2 className="title">PokeReact</h2>
                <div className="d-flex justify-content-between">
                    <Link to="/play" className="nav-link"><i className="fa-solid fa-gamepad fa-xl"></i></Link>
                    <Link to="/pokemons" className="nav-link"><i className="fa-solid fa-book fa-xl mx-3"></i></Link>
                    {userID ? (
                      <Link to="/" className="nav-link" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket fa-xl"></i></Link>
                    ) : (
                      <Link to="/login" className="nav-link"><i className="fa-solid fa-user fa-xl"></i></Link>
                    )}
                </div>
              </div>
            </nav>
                
        </header>
    );
}


export default AppHeader;