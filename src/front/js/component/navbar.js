import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
//import { useContext } from "react/cjs/react.production.min"; o/home en el link a widetravel

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid"> 
        <Link to="/" className="buttons"> 
          WideTravel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <div className="ml-auto">
          {!store.token ?
            <div><Link to="/login"><button className="login btn btn-primary">login</button></Link>
            <Link to="/signup" className="signup btn btn-secundary">Sign Up</Link></div>          
            :
            <Link to="/"><button onClick={() => actions.logout() } className="login btn btn-primary">logout</button></Link>
        }
        </div>
      </div>
    </div>
    </nav>
  );
};
