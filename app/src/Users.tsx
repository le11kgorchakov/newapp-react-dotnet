import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import AddUserModal from './AddUserModal';
import { IUsers } from './interfaces';



const User: FunctionComponent<IUsers> = () =>
{
    const [users, setUsers] = useState<IUsers[]>([])
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [userId, setUserId] = useState<number>()
    const [userName, setUserName] = useState<string>()
    const [userLastName, setUserLastName] = useState<string>()
    const [fileName, setFileName] = useState<string>()
    const uObject = {
        userName: userName ? userName : '', userLastName: userLastName ? userLastName : '', userId: userId ? userId : 0, fileName: fileName ? fileName : 'undefined'
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
        axios.get(process.env.REACT_APP_API + 'user').then(response =>
        {
            setUsers(response.data)
        })
    }

    useEffect(() =>
    {
        refreshList()
    }, [])

    return (
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <th>UserId</th>
                    <th>UserName</th>
                    <th>UserLastName</th>
                    <th>Photo</th>
                    <th>Options</th>
                </thead>
                <tbody>
                    {users.map((u: IUsers) =>
                        <tr key={u.userId}>
                            <td>{u.userId}</td>
                            <td>{u.userName}</td>
                            <td>{u.userLastName}</td>
                            <td>{u.fileName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info" onClick={() =>
                                    {
                                        // setEditModal(true); setTaskid(t.taskId); setTaskName(t.taskName); setDescription(t.taskDescription)
                                    }
                                    }>Edit</Button>
                                    <Button className="mr-2" variant="info" >Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar >
                <Button className="text-right" variant='primary' onClick={toggleAddModal} >
                    Add User</Button>
                {/* <EditTaskModal isShown={editModal} hide={toggleEditModal} t={
                    { taskName: taskName ? taskName : '', taskDescription: taskDescription ? taskDescription : '', taskId: taskid ? taskid : 0 }
                } /> */}
                <AddUserModal isShown={addModal} hide={toggleAddModal} u={uObject} />
            </ButtonToolbar>
        </div >
    )
}
export default User