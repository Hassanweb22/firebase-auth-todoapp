import React from 'react'
import { Navbar } from "react-bootstrap"

export default function NavBar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img alt="" src={require("../images/logo.svg")} width="30" height="30" className="d-inline-block align-top"
                    />
                    <span className="ml-3">Todo App</span>
                </Navbar.Brand>
            </Navbar>
        </div>
    )
}
