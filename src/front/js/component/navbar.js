import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
//import { useContext } from "react/cjs/react.production.min";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar ">
        <Link to="/home" className="buttons">
          inicio
        </Link>
        <div className="ml-auto">
          {!store.token ?
                  <Link to="/login">
                  <button className="login btn btn-primary">login</button>
                </Link>
                :
                <Link to="/">
                <button onClick={() => actions.logout() } className="login btn btn-primary">logout</button>
                </Link>
                }
      </div>
    </nav>
  );
};
