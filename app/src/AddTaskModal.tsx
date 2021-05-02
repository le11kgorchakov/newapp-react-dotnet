
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ITaskModal, ITasks } from './interfaces';

const AddTaskModal: React.FC<ITaskModal> = (props) =>
{
    const { isShown, hide, t, modalType } = props
    const [taskName, setTaskName] = useState<string>()
    const [taskDescription, setDescription] = useState<string>()
    const [taskStartDate, setStartDate] = useState<string>()
    const [taskDueDate, setDueDate] = useState<string>()

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.post<ITasks>(process.env.REACT_APP_API + 'task', {
            taskName: taskName, taskDescription: taskDescription,
            taskStartDate: taskStartDate, taskDueDate: taskDueDate
        }).then(response => { return response })
        hide()
    }

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.put<ITasks>(process.env.REACT_APP_API + 'task', {
            taskId: t.taskId,
            taskName: taskName,
            taskDescription: taskDescription,
            taskStartDate: taskStartDate,
            taskDueDate: taskDueDate
        }).then(response => { console.log(response) })
        axios.get<ITasks>(process.env.REACT_APP_API + 'task')
        hide()
    }

    useEffect(() =>
    {
        setStartDate(t.taskStartDate); setDescription(t.taskDescription); setTaskName(t.taskName); setDueDate(t.taskDueDate)
    }, [t])

    return (
        <div className="container">
            <Modal show={isShown} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onHide={hide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalType === 'add' ? `Add Task` : ''}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleAdd}>
                                <Form.Group controlId="TaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text" name="TaskName" required
                                        placeholder="TaskName" onChange={e => setTaskName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="TaskDescription">
                                    <Form.Label>Task Description</Form.Label>
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
                        <Col sm={6}>
                            <Form.Group controlId="StartDate">
                                <Form.Label>StartDate</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="StartDate"
                                    required
                                    placeholder="StartDate"
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="DueDate">
                                <Form.Label>DueDate</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="DueDate"
                                    required
                                    placeholder="DueDate"
                                    onChange={e => setDueDate(e.target.value)}
                                />
                            </Form.Group>
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