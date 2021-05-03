import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, ButtonToolbar, Table, Image } from 'react-bootstrap';
import UserModal from './UserModal';
import { IUsers } from './interfaces';



const User: FunctionComponent<IUsers> = () =>
{
    const [users, setUsers] = useState<IUsers[]>([])
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState<number>()
    const [userName, setUserName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()
    const [selectedTask, setSelectedTask] = useState<string>()
    const [modal, setModal] = useState<string>('add')
    const [pageUpdate, setPageUpdate] = useState(false)
    const [photoFileName, setPhotoFileName] = useState("anonymous.png")
    const uObject = {
        userName: userName ? userName : '',
        userLastName: userLastName ? userLastName : '',
        userId: userId ? userId : 0,
        fileName: photoFileName ? photoFileName : 'undefined',
        taskName: selectedTask ? selectedTask : ''
    }

    const toggleModal = () =>
    {
        setShowModal(!showModal)
        setPageUpdate(true)
    };

    const refreshList = () =>
    {
        axios.get<IUsers[]>(process.env.REACT_APP_API + 'user').then(response =>
        {
            setUsers(response.data)
        })
    }

    const deleteUser = (id: number | undefined) =>
    {
        if (id)
        {
            axios.delete<number>(process.env.REACT_APP_API + 'user/' + id).then(response => { return response })
            setPageUpdate(true)
        }
    }

    useEffect(() =>
    {
        refreshList()
        setPageUpdate(false)
    }, [showModal, pageUpdate])

    return (
        <div>
            <h2 className="mt-4" >Users Overview</h2>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <th>User Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Assigned Task</th>
                    <th>Thumbnail</th>
                    <th>Options</th>
                </thead>
                <tbody>
                    {users.map((u: IUsers) =>
                        <tr key={u.userId}>
                            <td>{u.userId}</td>
                            <td>{u.userName}</td>
                            <td>{u.userLastName}</td>
                            <td>{u.taskName}</td>
                            <td>
                                <Image width="40px" height="40px" src={process.env.REACT_APP_API + 'user/getfile/' + u.fileName} />
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={() =>
                                        {
                                            setShowModal(true);
                                            setModal('edit')
                                            setUserId(u.userId);
                                            setUserName(u.userName);
                                            setUserLastName(u.userLastName);
                                            setPhotoFileName(u.fileName);
                                            setSelectedTask(u.taskName)
                                        }
                                        }>Edit</Button>

                                        <Button className="mr-2" variant="info" onClick={() =>
                                        {
                                            setModal('duplicate');
                                            setShowModal(true);
                                            setUserId(u.userId);
                                            setUserName(`Copy of ${u.userName}`);
                                            setUserLastName(u.userLastName);
                                            setPhotoFileName(u.fileName);
                                            setSelectedTask(u.taskName)
                                        }
                                        }>Duplicate</Button>

                                        <Button className="mr-2" variant="info" onClick={() => { deleteUser(u.userId) }} >Delete</Button>
                                    </ButtonToolbar>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar >
                <Button variant='primary' onClick={() => { setShowModal(true); setModal('add') }} >
                    Add User</Button>
                <UserModal isShown={showModal} u={uObject} modalType={modal} hide={toggleModal} />
            </ButtonToolbar>
        </div >
    )
}
export default User