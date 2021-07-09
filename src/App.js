import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/HOC/PrivateRoute";

import Nav from "./components/Nav";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateAdForm from "./components/CreateAdForm";
import PopularCategories from "./components/PopularCategories";
import AdCards from "./components/AdCards";
import Footer from "./components/Footer";
import AdDetails from "./components/AdDetails";
import ScrollButton from "./components/ScrollButton";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import AccessDenied from "./components/AccessDenied";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <header>
        <Nav />
      </header>
      <div className={classes.toolbar}></div>
      <main>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/">
            <PopularCategories />
            <AdCards />
          </Route>

          <Route exact path="/ad/:id">
            <AdDetails />
          </Route>

          <PrivateRoute path="/dashboard" component={Dashboard} />

          <PrivateRoute exact path="/sell" component={CreateAdForm} />

          <PrivateRoute exact path="/access-denied" component={AccessDenied} />

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      <ScrollButton />
      <Footer />
    </div>
  );
}

export default App;
