
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ITasks, IUserModal } from './interfaces';

const EditUserModal: React.FC<IUserModal> = (props) =>
{
    const { isShown, hide, u } = props
    const [userName, setUserName] = useState<string>(u.userName)
    const [userLastName, setUserLastName] = useState<string>(u.userLastName)
    const [fileName, setFileName] = useState<string>(u.fileName)
    const [tasks, setTasks] = useState<ITasks[]>([])
    const [selectedTask, setSelectedTask] = useState<string>('select task')
    const [imageSrc, setImageSrc] = useState<any>()

    const getTasks = () =>
    {
        axios.get(process.env.REACT_APP_API + 'task').then(response =>
        {
            setTasks(response.data)
        })
    }

    useEffect(() =>
    {
        getTasks()
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API + 'user', { userName: userName, userLastName: userLastName, taskName: selectedTask }).then(response => { return response })
    }

    return (
        <div className="container">
            <Modal show={isShown} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton onHide={hide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="UserID">
                                    <Form.Label>UserID</Form.Label>
                                    <Form.Control type="text" name="UserID" required
                                        placeholder="UserID" disabled defaultValue={u.userId} />
                                </Form.Group>

                                <Form.Group controlId="UserName">
                                    <Form.Label>UserName</Form.Label>
                                    <Form.Control type="text" name="UserName" required
                                        placeholder="UserName" onChange={e => setUserName(e.target.value)} defaultValue={u.userName} />
                                </Form.Group>

                                <Form.Group controlId="UserLastName">
                                    <Form.Label>UserLastName</Form.Label>
                                    <Form.Control type="text" name="UserName" required
                                        placeholder="UserLastName" onChange={e => setUserLastName(e.target.value)} defaultValue={u.userLastName} />
                                </Form.Group>

                                <Form.Group controlId="Task">
                                    <Form.Label>Task</Form.Label>
                                    <Form.Control as="select" onChange={e => setSelectedTask(e.target.value)} >
                                        {tasks.map(t =>
                                            <option key={t.taskId} >{t.taskName}</option>)}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update User
                                </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            {/* <Image width="200px" height="200px" src={imageSrc} />
                            <input onChange={handleFileSelected} type="File" /> */}
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={hide} >Close</Button>
                </Modal.Footer>

            </Modal>

        </div>
    )
}
export default EditUserModal