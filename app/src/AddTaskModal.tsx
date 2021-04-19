
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ITaskModal } from './interfaces';

const AddTaskModal: React.FC<ITaskModal> = (props) =>
{
    const { isShown, hide } = props
    const [task, setTaskName] = useState<string>()
    const [taskDescription, setDescription] = useState<string>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API + 'task', { taskName: task, taskDescription: taskDescription }).then(response => { return response })
        axios.get(process.env.REACT_APP_API + 'task')
        hide()
    }

    return (
        <div className="container">
            <Modal show={isShown} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onHide={hide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Task
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="TaskName">
                                    <Form.Label>TaskName</Form.Label>
                                    <Form.Control type="text" name="TaskName" required
                                        placeholder="TaskName" onChange={e => setTaskName(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="TaskDescription">
                                    <Form.Label>TaskName</Form.Label>
                                    <Form.Control type="text" name="TaskDescription" required
                                        placeholder="TaskDescription" onChange={e => setDescription(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Task
                                </Button>
                                </Form.Group>
                            </Form>
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
export default AddTaskModal