import React, { useState } from 'react'
import { Form, Button, Table } from "react-bootstrap"
import { PencilFill, Trash } from "react-bootstrap-icons"


export default function Main() {
    let initialState = {
        title: "",
        descr: "",
    }
    let initialData = [
        {
            id: 1,
            title: "food",
            descr: "biryani",
            time: "9:45 PM"
        },
        {
            id: 2,
            title: "shooping",
            descr: "dresses",
            time: "4:45 PM"
        }
    ]

    const [state, setState] = useState(initialState)
    const [data, setData] = useState(initialData)
    const [editId, setEditId] = useState(null)
    let { title, descr } = state

    const handleChange = (e) => {
        let { name, value } = e.target
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editId !== null) {
            let index = data.findIndex((user) => user.id == editId)
            let obj = { id: data[index].id, title, descr, time: data[index].time }
            console.log({ editId, obj })
            let newArray = [...data]
            newArray.splice(index, 1, obj)
            setData(newArray)
            setEditId(null)
        }
        else {
            let time = new Date()
            let obj = { id: "a" + data.length + "b" + Math.floor(Math.random() * 500 - 20) + "c", title, descr, time: time.toLocaleTimeString() }
            setData([...data, obj])
            console.log({ newID: obj.id, obj })
        }
        setState({
            ...initialState,
        })
    }

    let handleEdit = (id) => {
        setEditId(id)
        let index = data.findIndex((user) => user.id == id)
        setState({
            ...state, title: data[index].title, descr: data[index].descr
        })
        // console.log("editId", editId)
    }

    let handleDelete = (id) => {
        let index = data.findIndex((user) => user.id == id)
        console.log({ index, id })
        let newArray = [...data]
        newArray.splice(index, 1)
        if (window.confirm("are you sure you want to dlete?")) {
            setData(newArray)
        }
    }

    let validate = () => (state.title && state.descr) ? true : false

    return (
        <div className="container mt-5">
            <div className="row">
                <Form className="col-lg-6 col-md-8 col-sm-12 mx-auto" onSubmit={handleSubmit}>
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
                        {!editId ? "Submit" : "Update"}</Button>
                </Form>
            </div>
            <div className="row mt-4">
                {/* Table task */}
                <div className="col-lg-10 col-md-10 col-sm-12 col-12 mx-auto text-center">
                    <Table variant="light" className="" striped responsive bordered hover size="md">
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
                            {data.map((user, i) => {
                                return < tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.title}</td>
                                    <td>{user.descr}</td>
                                    <td>{user.time}</td>
                                    <td>
                                        <PencilFill className="mx-2" color="royalblue"
                                            onClick={() => handleEdit(user.id)}
                                        />
                                        <Trash color="red"
                                            onClick={() => handleDelete(user.id)}
                                        />
                                    </td>
                                </tr>
                            })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

        </div >
    )
}
