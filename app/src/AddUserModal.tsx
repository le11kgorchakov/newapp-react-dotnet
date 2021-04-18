
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { ITasks, IUserModal } from './interfaces';

const AddUserModal: React.FC<IUserModal> = (props) =>
{
    const { isShown, hide } = props
    const [userName, setUserName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()
    const [fileName, setFileName] = useState<string>()
    const [tasks, setTasks] = useState<ITasks[]>([])

    const getTasks = () =>
    {
        axios.get(process.env.REACT_APP_API + 'task').then(response =>
        {
            setTasks(response.data)
        })
    }

    let photofilename = "anonymous.png";
    const imagesrc = process.env.REACT_APP_PHOTOPATH + photofilename;


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API + 'user', { userName: userName, userLastName: userLastName, fileName: fileName }).then(response => { return response })
    }

    const handleFileSelected: React.ChangeEventHandler<HTMLInputElement> = (e: any) =>
    {
        e.preventDefault();
        photofilename = e.target.files[0].name
        const formData = new FormData();
        formData.append(
            "myFile",
            e.target.files[0],
            e.target.files[0].name
        );

        axios.post(process.env.REACT_APP_API + 'user/savefile', { body: formData })
    }

    useEffect(() =>
    {
        getTasks()
    }, [])

    return (
        <div className="container">
            <Modal show={isShown} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onHide={hide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add User
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="UserName">
                                    <Form.Label>UserName</Form.Label>
                                    <Form.Control type="text" name="UserName" required
                                        placeholder="UserName" onChange={e => setUserName(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="UserLastName">
                                    <Form.Label>UserLastName</Form.Label>
                                    <Form.Control type="text" name="UserLastName" required
                                        placeholder="UserLastName" onChange={e => setUserLastName(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="Task">
                                    <Form.Label>Task</Form.Label>
                                    <Form.Control as="select">
                                        {tasks.map(t =>
                                            <option key={t.taskId}>{t.taskName}</option>)}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add User
                                </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Image width="200px" height="200px" src={imagesrc} />
                            <input onChange={handleFileSelected} type="File" />
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={hide} >Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default AddUserModal