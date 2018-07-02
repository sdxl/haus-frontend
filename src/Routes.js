import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import AppliedRoute from "./components/AppliedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({childProps}) => 
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps}/>
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps}/>        
        <AppliedRoute component={NotFound} />
    </Switch>;