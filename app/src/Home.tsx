import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Button, ButtonToolbar, Table, Image } from 'react-bootstrap';
import { ITasks, IUsers } from './interfaces';

const Home: FunctionComponent = () =>
{
    const [users, setUsers] = useState<IUsers[]>([])
    const [tasks, setTasks] = useState<ITasks[]>([])

    useEffect(() =>
    {
        axios.get<IUsers[]>(process.env.REACT_APP_API + 'user').then(response => setUsers(response.data))
        axios.get<ITasks[]>(process.env.REACT_APP_API + 'task').then(response => setTasks(response.data))
    }, [])

    return (
        <div>
            <div>
                <h2>Users</h2>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Last Name</th>
                        <th>Assigned Task</th>
                        <th>Thumbnail</th>

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
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <div>
                <h2 className="mt-4" >Tasks</h2>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>Task Id</th>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Start Date</th>
                        <th>Due Date</th>

                    </thead>
                    <tbody>
                        {tasks.map((t: ITasks) =>
                            <tr key={t.taskId}>
                                <td>{t.taskId}</td>
                                <td>{t.taskName}</td>
                                <td>{t.taskDescription}</td>
                                <td>{t.taskStartDate}</td>
                                <td>{t.taskDueDate}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div >
        </div>
    )
}
export default Home