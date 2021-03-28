import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from "react-bootstrap"
import { useHistory } from 'react-router-dom'
import firebase from "./fire"

export default function SignUp() {
    const history = useHistory()
    let initialState = {
        username: "",
        email: "",
        password: "",
    }
    const [state, setState] = useState(initialState)
    let { email, password, username } = state

    useEffect(() => {
        if (firebase.auth().currentUser) {
            console.log("signuped")
        }
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
                console.log("Signupuser", user.uid)
                history.push("./dashboard")
                firebase.database().ref('users/' + user.uid + "/personal").set(
                    obj,
                    err => {
                        if (err) {
                            console.log("error", err)
                        }
                    });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Signuperror", errorCode, errorMessage)
            });
        setState(initialState)
    }
    let validate = () => (username && email && password) ? true : false


    return (

        <div className="container mt-5">
            <h2 className="text-center text-capitalize main_heading mt-3">Signup</h2>
            <div className="row">
                <Card className="card_body col-lg-8 col-sm-12 col-md-10 col-12 mx-auto " style={{ width: '40rem' }}>
                    <Form className="my-3" onSubmit={handleSubmit}>
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
                            {"Submit"}</Button>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
