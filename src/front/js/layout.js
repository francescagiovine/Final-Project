import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import SignUp from "./pages/signup";
import CreateTravel from "./pages/createTravel";
import EditTravel from "./component/editTravel";
import CreateActivity from "./pages/createActivity";
import Activities from "./component/activities";
import EditActivity from "./component/editActivity";

import Home from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Navbar } from "./component/navbar";
import { Private } from "./pages/private";
import { Profile } from "./pages/profile";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signUp">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/private">
              <Private />
            </Route>
            <Route exact path="/create-travel">
              <CreateTravel />
            </Route>
            <Route exact path="/edit-travel/:id">
              <EditTravel />
            </Route>
            <Route exact path="/create-activity">
              <CreateActivity />
            </Route>
            <Route exact path="/activities">
              <Activities />
            </Route>
            <Route exact path="/edit-activity/:id">
              <EditActivity />
            </Route>
            <Route exact path="/demo">
              <Demo />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
