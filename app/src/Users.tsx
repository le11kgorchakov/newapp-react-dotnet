import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, ButtonToolbar, Table, Image } from 'react-bootstrap';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal'
import { IUsers } from './interfaces';



const User: FunctionComponent<IUsers> = () =>
{
    const [users, setUsers] = useState<IUsers[]>([])
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [userId, setUserId] = useState<number>()
    const [userName, setUserName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()
    const [selectedTask, setSelectedTask] = useState<string>()
    const [photoFileName, setPhotoFileName] = useState("anonymous.png")
    const uObject = {
        userName: userName ? userName : '',
        userLastName: userLastName ? userLastName : '',
        userId: userId ? userId : 0,
        fileName: photoFileName ? photoFileName : 'undefined',
        taskName: selectedTask ? selectedTask : ''
    }

    const toggleAddModal = () =>
    {
        refreshList()
        setAddModal(!addModal)
    };

    const toggleEditModal = () =>
    {
        refreshList()
        setEditModal(!editModal)
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
            axios.get<IUsers>(process.env.REACT_APP_API + 'user')
            window.location.reload()
        }
    }

    useEffect(() =>
    {
        refreshList()
    }, [addModal, editModal])

    return (
        <div>
            <h2 className="mt-4" >Users Overview</h2>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <th>User Id</th>
                    <th>User Name</th>
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
                                            setEditModal(true); setUserId(u.userId); setUserName(u.userName);
                                            setUserLastName(u.userLastName); setPhotoFileName(u.fileName);
                                            setSelectedTask(u.taskName)
                                        }
                                        }>Edit</Button>
                                        <Button className="mr-2" variant="info" onClick={() => { deleteUser(u.userId) }} >Delete</Button>
                                    </ButtonToolbar>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar >
                <Button variant='primary' onClick={toggleAddModal} >
                    Add User</Button>
                <EditUserModal isShown={editModal} hide={toggleEditModal} u={uObject} />
                <AddUserModal isShown={addModal} hide={toggleAddModal} u={uObject} />
            </ButtonToolbar>
        </div >
    )
}
export default User