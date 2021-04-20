
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { ITasks, IUserModal, IUsers } from './interfaces';

const EditUserModal: React.FC<IUserModal> = (props) =>
{
    const { isShown, hide, u } = props
    const [userName, setUserName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()
    const [tasks, setTasks] = useState<ITasks[]>([])
    const [selectedTask, setSelectedTask] = useState<string | undefined>()
    const [photoFileName, setPhotoFileName] = useState<string>()
    const [imageSrc, setImageSrc] = useState<string>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        axios.put<IUsers>(process.env.REACT_APP_API + 'user', {
            userId: u.userId,
            userName: userName,
            userLastName: userLastName,
            taskName: selectedTask,
            fileName: photoFileName
        }).then(response => { console.log(response) })
        axios.get<IUsers>(process.env.REACT_APP_API + 'user')
        hide()
    }

    const fileChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e: any) =>
    {
        e.preventDefault();
        const file = e.target.files[0].name
        setPhotoFileName(file ? file : "inmo.jpg")
        const formData = new FormData();
        formData.append(
            "myFile",
            e.target.files[0],
            e.target.files[0].name
        );
        axios.post(process.env.REACT_APP_API + 'user/savefile', formData).then(response =>
        {
            const img = response.data
            setImageSrc(img)
        })
    }

    useEffect(() =>
    {
        axios.get<ITasks[]>(process.env.REACT_APP_API + 'task').then(response =>
        {
            setTasks(response.data)
        })
        setUserName(u.userName); setUserLastName(u.userLastName); setSelectedTask(u.taskName); setPhotoFileName(u.fileName)
    }, [u])

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
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="text" name="UserID" required
                                        placeholder="UserID" disabled defaultValue={u.userId} />
                                </Form.Group>

                                <Form.Group controlId="UserName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" name="UserName" required
                                        placeholder="UserName" onChange={e => setUserName(e.target.value)} defaultValue={u.userName} />
                                </Form.Group>

                                <Form.Group controlId="UserLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="UserName" required
                                        placeholder="UserLastName" onChange={e => setUserLastName(e.target.value)} defaultValue={u.userLastName} />
                                </Form.Group>

                                <Form.Group controlId="Task">
                                    <Form.Label>Task</Form.Label>
                                    <Form.Control as="select" onChange={e =>
                                    {
                                        setSelectedTask(e.target.value)
                                    }} >
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
                            <Image width="200px" height="200px" src={process.env.REACT_APP_API + 'user/getfile/' + (imageSrc ? imageSrc : u.fileName)} />
                            <input onChange={fileChangeHandler} type="File" />
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