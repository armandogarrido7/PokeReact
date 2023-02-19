function AppLogin(){
    function signUp(){

    }
    function login(){

    }
    return (
        <div className="d-flex flex-row container-fluid m-auto">
            <div className="d-flex flex-column mx-5">
                <h3>Sign Up</h3>
                <form className="d-flex flex-column">
                    <label className="form-label">
                        Email
                        <input type="text" className="form-control"></input>
                    </label>
                    <label className="form-label">
                        Password
                        <input type="password" className="form-control"></input>
                    </label>
                </form>
                <button onClick={signUp} className="btn btn-primary">Sign Up</button>
            </div>
            <div className="d-flex flex-column">
                <h3>Login</h3>
                <form className="d-flex flex-column">
                    <label className="form-label">
                        Email
                        <input type="text" className="form-control"></input>
                    </label>
                    <label className="form-label">
                        Password
                        <input type="password" className="form-control"></input>
                    </label>
                </form>
                <button onClick={login} className="btn btn-primary">Login</button>
            </div>

        </div>
    );
}


export default AppLogin;