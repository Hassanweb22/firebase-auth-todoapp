import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap"
import { X } from "react-bootstrap-icons"
import { useHistory } from 'react-router-dom'
import firebase from "./fire"
import "./style.css"
import styled, { keyframes } from "styled-components"
import { bounce } from "react-animations"


export default function SignUp() {
    const Bounce = styled.div`
    animations: 2s ${keyframes`${bounce}`} infinite
    `

    const history = useHistory()
    let initialState = {
        username: "",
        email: "",
        password: "",
    }
    const [state, setState] = useState(initialState)
    const [error, setError] = useState("")
    let { email, password, username } = state

    useEffect(() => {
        if (firebase.auth().currentUser) {
            console.log("signuped")
        }
        return () => console.log("signUp removed")
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("state", state)
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                let obj = { username, email: user.email, password, key: user.uid }
                // console.log("Signupuser", user.uid)
                firebase.database().ref('users/' + user.uid + "/personal").set(
                    obj,
                    err => {
                        if (err) {
                            console.log("error", err)
                        }
                    });
                history.push("./dashboard")
                setState(initialState)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("error Code", errorCode)
                console.log("errorMessage", errorMessage)
                if (errorCode === "auth/weak-password" || errorCode === "auth/email-already-in-use") {
                    setError(errorMessage)
                    return setTimeout(() => {
                        setError("")
                    }, 3200);
                }
            });
    }
    let validate = () => (username && email && password) ? true : false


    return (

        <div className="container mt-5">
            <h2 className="text-center text-capitalize main_heading mt-3">Signup</h2>
            <div className="row show">
                <Card className="card_body col-lg-8 col-sm-12 col-md-10 col-11 mx-auto " style={{ width: '40rem' }}>
                    {error ?
                        <Alert className={`alert mt-3`} variant="danger">{error}
                            {/* <X color="black" className="" onClick={_ => setError("")} /> */}
                        </Alert>
                        : null}
                    < Form className="my-3" onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button className="w-100" variant="primary" type="submit" disabled={!validate()}>
                            {firebase.auth().currentUser ?
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Submit"}
                        </Button>
                    </Form>
                </Card>
            </div>
        </div >
    )
}
