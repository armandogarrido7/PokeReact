import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function AppLogin(){
    const [login_email, setLoginEmail] = useState("");
    const [login_password, setLoginPassword] = useState("");
    const [register_email, setRegisterEmail] = useState("");
    const [register_password, setRegisterPassword] = useState("");

    const navigate = useNavigate();

    function signUp(){
        createUserWithEmailAndPassword(auth, register_email, register_password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              navigate("/");
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
          });
    }

    function login(){
        signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
        const user = userCredential.user;
          navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    function googleLogin(){
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3 d-flex flex-column mx-5">
                    <h3>Sign Up</h3>
                    <form className="d-flex flex-column">
                        <label className="form-label">
                            Email
                            <input type="text" className="form-control" value={register_email} onChange={(e) => setRegisterEmail(e.target.value)}></input>
                        </label>
                        <label className="form-label">
                            Password
                            <input type="password" className="form-control" value={register_password} onChange={(e) => setRegisterPassword(e.target.value)}></input>
                        </label>
                    </form>
                    <button onClick={signUp} className="btn btn-primary my-4">Sign Up</button>
                </div>
                <div className="col-3 offset-2 d-flex flex-column">
                    <h3>Login</h3>
                    <form className="d-flex flex-column">
                        <label className="form-label">
                            Email
                            <input type="text" className="form-control" value={login_email} onChange={(e) => setLoginEmail(e.target.value)}></input>
                        </label>
                        <label className="form-label">
                            Password
                            <input type="password" className="form-control" value={login_password} onChange={(e) => setLoginPassword(e.target.value)}></input>
                        </label>
                    </form>
                    <button onClick={login} className="btn btn-primary my-4">Login</button>
                    <button onClick={googleLogin} className="btn btn-info">Login with Google <i className="fa-brands fa-google"></i></button>
                </div>

            </div>
        </div>
    );
}


export default AppLogin;