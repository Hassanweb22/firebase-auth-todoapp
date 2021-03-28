import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import firebase from "./fire"


export default function NavBar() {
    let history = useHistory()

    const [state, setstate] = useState({})

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // https://firebase.google.com/docs/reference/js/firebase.User
                // console.log("authuser", user)
                setstate(user)
            }
            else {
                // console.log("authuser  is empty")
                setstate({})
            }
        });
    }, [])

    const signOut = () => {
        firebase.auth().signOut()
        history.push("./")
    }
    // console.log("setuser", state.email)

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{ cursor: "pointer" }}
                    onClick={() => history.push("./")}
                >React Todoapp</Navbar.Brand>
                <Nav className="mr-auto">
                    {!firebase.auth().currentUser ? <>
                        <Nav.Link onClick={() => history.push("./login")}>Login</Nav.Link>
                        < Nav.Link onClick={() => history.push("./signup")}>Signup</Nav.Link>
                    </>
                        : <Nav.Link onClick={() => history.push("./dashboard")}>Dashbord</Nav.Link>}

                </Nav>
                <Form inline>
                    {/* <Form.Control type="text" placeholder="Search" className="mr-sm-2" /> */}
                    {/* <Button variant="outline-info" onClick={() => console.log("setuser", firebase.auth().currentUser)}> user</Button> */}
                    {firebase.auth().currentUser ? <Button variant="info" size="" onClick={signOut}>Logout</Button> : null}
                </Form>
            </Navbar>
        </div >
    )
}


