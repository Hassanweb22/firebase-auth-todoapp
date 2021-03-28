import React from 'react'
import { Card, Row, Col, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import fire from './fire'


export default function Home() {
    let history = useHistory()

    return (
        <div>
            <div className="container">
                <h2 className="text-center text-capitalize main_heading mt-3">Home Page</h2>
                <div className="row">
                    <Card className="card_body col-lg-8 col-sm-9 col-md-10 col-11 mx-auto mt-4" style={{ width: '40rem' }}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                            <Card.Title className="text-center text-capitalize font-italic text-info"
                                style={{ fontSize: 25 }}
                            >Welcome To TodoApp</Card.Title>
                            <Row>
                                {!fire.auth().currentUser?.uid ?
                                    <Card.Text className="text-center mx-auto font-weight-bold">Your Need to Make an Account <br />OR Login:</Card.Text>
                                    : <Card.Text className="text-center mx-auto font-weight-bold">You are Already Loged In <br />Go to Dashboard:</Card.Text>
                                }
                            </Row>
                            < Row className="mt-3">
                                {!fire.auth().currentUser?.uid ?
                                    <Col className="text-center">
                                        <Button className=" rounded-5 px-4 py-2" variant="success"
                                            onClick={() => history.push("./signup")}>Sign Up</Button>

                                        <Button className="rounded-5 mx-3 px-4 py-2" variant="success"
                                            onClick={() => history.push("./login")}>Login</Button>
                                    </Col>
                                    : <Col className="text-center">
                                        <Button className="rounded-5 mx-3 px-4 py-2" variant="success"
                                            onClick={() => history.push("./dashboard")}>Dasshboard</Button>
                                    </Col>}
                            </Row>
                        </Card.Body>
                    </Card>
                </div >
            </div >
        </div >
    )
}
