
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ITaskModal } from './interfaces';

const EditTaskModal: React.FC<ITaskModal> = (props) =>
{
    const { isShown, hide, t } = props
    const [taskName, setTaskName] = useState<string>(t.taskName)
    const [taskDescription, setDescription] = useState<string>(t.taskDescription)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API + 'task', { taskId: t.taskId, taskName: taskName, taskDescription: taskDescription }).then(response => { console.log(response) })
        axios.get(process.env.REACT_APP_API + 'task')

        hide()

    }

    return (
        <div className="container">
            <Modal show={isShown} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton onHide={hide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Task
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="TaskID">
                                    <Form.Label>TaskID</Form.Label>
                                    <Form.Control type="text" name="TaskID" required
                                        placeholder="TaskID" disabled defaultValue={t.taskId} />
                                </Form.Group>

                                <Form.Group controlId="TaskName">
                                    <Form.Label>TaskName</Form.Label>
                                    <Form.Control type="text" name="TaskName" required
                                        placeholder="TaskName" onChange={e => setTaskName(e.target.value)} defaultValue={t.taskName} />
                                </Form.Group>

                                <Form.Group controlId="TaskDescription">
                                    <Form.Label>TaskDescription</Form.Label>
                                    <Form.Control type="text" name="TaskDscription" required
                                        placeholder="TaskDescription" onChange={e => setDescription(e.target.value)} defaultValue={t.taskDescription} />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Task
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

        </div>
    )
}
export default EditTaskModal