
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { ITasks, IUserModal, IUsers } from './interfaces';

const UserModal: React.FC<IUserModal> = (props) =>
{
    const { isShown, hide, modalType, u } = props
    const [userName, setUserName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()
    const [tasks, setTasks] = useState<ITasks[]>([])
    const [selectedTask, setSelectedTask] = useState<string>()
    const [imageSrc, setImageSrc] = useState(u.fileName)

    const getTasks = () =>
    {
        axios.get(process.env.REACT_APP_API + 'task').then(response =>
        {
            setTasks(response.data)
        })
    }

    const handleAddUser = (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API + 'user', {
            userName: userName,
            userLastName: userLastName,
            taskName: selectedTask,
            fileName: imageSrc
        }).then(response => { return response })
        hide()
    }

    const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        axios.put<IUsers>(process.env.REACT_APP_API + 'user', {
            userId: u.userId,
            userName: userName,
            userLastName: userLastName,
            taskName: selectedTask,
            fileName: imageSrc
        }).then(response => { console.log(response) })
        hide()
    }

    const fileChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e: any) =>
    {
        e.preventDefault();
        const file = e.target.files[0].name
        setImageSrc(file ? file : "inmo.jpg")
        const formData = new FormData();
        formData.append(
            "myFile",
            e.target.files[0],
            e.target.files[0].name
        );
        axios.post<string>(process.env.REACT_APP_API + 'user/savefile', formData).then(response =>
        {
            const img = response.data
            setImageSrc(img)
        })
    }

    useEffect(() =>
    {
        getTasks(); setUserName(u.userName); setUserLastName(u.userLastName); setImageSrc(u.fileName); setSelectedTask(u.taskName)
    }, [u])

    return (
        <div className="container">
            <Modal show={isShown} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onHide={hide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalType === 'add' ? 'Add User' : modalType === 'edit' ? 'Edit User' : modalType === 'duplicate' ? 'Duplicate User' : ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={modalType === 'add' ? handleAddUser : modalType === 'edit' ? handleEditUser : modalType === 'duplicate' ? handleAddUser : undefined}>

                                <Form.Group controlId="UserID">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="text" name="UserID" required
                                        placeholder="UserID" disabled defaultValue={modalType === 'add' ? '' : u.userId} />
                                </Form.Group>

                                <Form.Group controlId="UserName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="UserName" required
                                        placeholder="UserName" onChange={e => setUserName(e.target.value)} defaultValue={modalType === 'add' ? '' : u.userName} />
                                </Form.Group>

                                <Form.Group controlId="UserLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="UserLastName" required
                                        placeholder="UserLastName" onChange={e => setUserLastName(e.target.value)} defaultValue={modalType === 'add' ? '' : u.userLastName} />
                                </Form.Group>

                                <Form.Group controlId="Task">
                                    <Form.Label>Select Task</Form.Label>
                                    <Form.Control as="select" defaultValue={modalType === 'add' ? '' : u.taskName} onChange={e => setSelectedTask(e.target.value)}>
                                        <option>Select Task</option>
                                        {tasks.map(t =>
                                            <option key={t.taskId} >{t.taskName}</option>)}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        {modalType === 'add' ? 'Add User' : modalType === 'edit' ? 'Update User' : modalType === 'duplicate' ? 'Duplicate User' : ''}
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Image width="200px" height="200px" src={process.env.REACT_APP_API + 'user/getfile/' + (imageSrc ? imageSrc : u.fileName)} />
                            <input onChange={fileChangeHandler} type="File" />
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
export default UserModal