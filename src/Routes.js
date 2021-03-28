import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import NavBar from './components/NavBar';
import Dashboard from "./firebase/Dashboard"
import Navbar from './firebase/Navbar';
import Home from './firebase/Home'
import Login from "./firebase/Login"
import SignUp from "./firebase/SignUp"
import firebase from "./firebase/fire"

export default function Routes() {
    // console.log("dashboard", firebase.auth().currentUser)
    const [state, setstate] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // user is signed in.
                setstate(user)
            } else {
                // No user is signed in.
                setstate(user)
            }
        });
    }, [])
    return (
        < Router >
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/Login" component={Login} />
                <Route path="/Signup" component={SignUp} />
                {/* {state ? */}
                < Route path="/Dashboard" component={Dashboard} />
                {/* : null} */}
            </Switch>
        </Router >
    )
}
