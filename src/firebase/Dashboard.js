import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Row, Table } from "react-bootstrap"
import { PencilFill, Trash } from "react-bootstrap-icons"
import firebase from "./fire"
import { useHistory } from "react-router-dom"

export default function Dashboard() {
    const history = useHistory()
    let initialState = {
        title: "",
        descr: "",
        editId: null
    }

    const [state, setState] = useState(initialState)
    const [currentuser, setCurrentuser] = useState({})
    const [usertasks, setUsertasks] = useState({})
    let { title, descr } = state

    const firebaseData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // https://firebase.google.com/docs/reference/js/firebase.User
                firebase.database().ref('/users/').child(user.uid).on("value", snapshot => {
                    if (snapshot.val() !== null) {
                        console.log("getuserfromfirebase", snapshot.val())
                        setCurrentuser(snapshot.val()?.personal)
                        setUsertasks(snapshot.val()?.tasks)
                    }
                })
            }
            else {
                setCurrentuser({})
            }
        });
    }
    useEffect(() => {
        firebaseData()
        return () => console.log("Something has changed")
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
        const userId = firebase.auth().currentUser?.uid;
        if (state.editId !== null) {
            // let { title, descr, time } = usertasks[state.editId]
            console.log("Edit Key", usertasks[state.editId], state.editId, userId)
            let editObj = { title, descr, time: usertasks[state.editId].time }
            firebase.database().ref('users/' + userId + "/tasks").child(state.editId).set(
                editObj,
                err => {
                    if (err) {
                        console.log("error", err)
                    }
                });
        }
        else {
            // console.log("dashboard login user", currentuser?.key)
            const date = new Date()
            let obj = { title, descr, time: date.toDateString() }
            firebase.database().ref('users/' + userId + "/tasks").push(
                obj,
                err => {
                    if (err) {
                        console.log("error", err)
                    }
                });
        }
        setState(initialState)
    }

    const handleEdit = (key) => {
        let { title, descr, time } = usertasks[key]
        setState({ title, descr, editId: key })
    }

    const handleRemove = (key) => {
        const userId = firebase.auth().currentUser?.uid;
        if (window.confirm("Are you sure you want to delete?")) {
            firebase.database().ref('users/' + userId + "/tasks").child(key).remove(
                err => {
                    if (err) {
                        console.log("error", err)
                    }
                });
        }
    }

    const signOut = () => {
        firebase.auth().signOut()
        history.push("./")
    }

    let validate = () => (state.title && state.descr) ? true : false
    return (
        <div className="container mt-4">
            <h2 className="text-center text-capitalize main_heading mt-1 ">Dashboard</h2>

            <Card className="card_body col-lg-8 col-sm-12 col-md-10 col-12 mx-auto " style={{ width: '40rem' }}>
                <Card.Body>
                    <div className="">
                        <Card.Title className="text-center text-capitalize font-italic text-info"
                            style={{ fontSize: 25 }}>Welcome Dear {currentuser?.username}!</Card.Title>
                        {/* <Button className="rounded-5" variant="success"
                            onClick={() => signOut()}>Logout</Button> */}
                    </div>
                    <Row>
                        <Card.Text className="mx-auto font-weight-bold">{currentuser?.email}</Card.Text>
                    </Row>
                    {/* {personal?.username ? <>
                        <ListGroup className="listGroup" variant="flush ">
                            <ListGroup.Item><b>Email:</b> {personal?.email} </ListGroup.Item>
                        </ListGroup></>
                        : null} */}
                </Card.Body>
                <div className="">
                    <Form className="mx-auto my-2" onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Todo Task"
                                name="title"
                                value={title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description"
                                name="descr"
                                value={descr}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button className="w-100" variant="primary" type="submit" disabled={!validate()}>
                            {!state.editId ? "Submit" : "Update"}</Button>
                    </Form>
                </div>
            </Card>

            <div className="row mt-2">
                <div className="col-lg-10 col-md-12 col-sm-12 col-12 mx-auto text-center">
                    <Table variant="light" className="table-responsive-sm" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usertasks !== undefined ? Object.keys(usertasks).map((key, index) => {
                                return < tr key={key}>
                                    <td>{index + 1}</td>
                                    <td>{usertasks[key].title}</td>
                                    <td>{usertasks[key].descr}</td>
                                    <td>{usertasks[key].time}</td>
                                    <td>
                                        <PencilFill className="mx-2" color="royalblue"
                                            onClick={() => handleEdit(key)}
                                        />
                                        <Trash color="red"
                                            onClick={() => handleRemove(key)}
                                        />
                                    </td>
                                </tr>
                            }) : null}
                        </tbody>
                    </Table>
                </div>
            </div>

        </div >
    )
}
