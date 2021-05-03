import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { ITaskModal, ITasks } from "./interfaces"

const TaskModal: React.FC<ITaskModal> = (props) =>
{
    const { hide, isShown, t, modalType } = props
    const [taskName, setTaskName] = useState<string>()
    const [taskDescription, setDescription] = useState<string>()
    const [taskStartDate, setStartDate] = useState<string>()
    const [taskDueDate, setDueDate] = useState<string>()

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.post<ITasks>(process.env.REACT_APP_API + 'task', {
            taskName: taskName,
            taskDescription: taskDescription,
            taskStartDate: taskStartDate,
            taskDueDate: taskDueDate
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

    const handleDuplicate = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.post<ITasks>(process.env.REACT_APP_API + 'task', {
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
                        {modalType === 'add' ? 'Add Task' : modalType === 'edit' ? 'Edit Task' : modalType === 'duplicate' ? 'Duplicate Task' : ''}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={modalType === 'add' ? handleAdd : modalType === 'edit' ? handleEdit : modalType === 'duplicate' ? handleDuplicate : undefined}>

                                <Form.Group controlId="TaskID">
                                    <Form.Label>Task ID</Form.Label>
                                    <Form.Control type="text" name="TaskID" required
                                        placeholder="TaskID" disabled defaultValue={t.taskId} />
                                </Form.Group>

                                <Form.Group controlId="TaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text" name="TaskName" required
                                        placeholder="TaskName" onChange={e => setTaskName(e.target.value)} defaultValue={t.taskName} />
                                </Form.Group>
                                <Form.Group controlId="TaskDescription">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control type="text" name="TaskDescription" required
                                        placeholder="TaskDescription" onChange={e => setDescription(e.target.value)} defaultValue={t.taskDescription} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        {modalType === 'add' ? 'Add Task' : modalType === 'edit' ? 'Update Task' : modalType === 'duplicate' ? 'Duplicate Task' : ''}
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
                                    defaultValue={t.taskStartDate}
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
                                    defaultValue={t.taskDueDate}
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
export default TaskModal