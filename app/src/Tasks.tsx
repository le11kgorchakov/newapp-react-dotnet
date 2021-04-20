import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import AddTaskModal from './AddTaskModal'
import { ITasks } from './interfaces'
import EditTaskModal from './EditTaskModal'



const Tasks: React.FC<ITasks> = () =>
{
    const [tasks, setTasks] = useState<ITasks[]>([])
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [taskid, setTaskid] = useState<number>()
    const [taskName, setTaskName] = useState<string>()
    const [taskDescription, setDescription] = useState<string>()
    const [taskStartDate, setStartDate] = useState<string>()
    const [taskDueDate, setDueDate] = useState<string>()
    const tObject = {
        taskName: taskName ? taskName : '',
        taskDescription: taskDescription ? taskDescription : '',
        taskId: taskid ? taskid : 0,
        taskStartDate: taskStartDate ? taskStartDate : '',
        taskDueDate: taskDueDate ? taskDueDate : ''
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

    const deleteTask = (id: number | undefined) =>
    {
        if (id)
        {
            axios.delete<number>(process.env.REACT_APP_API + 'task/' + id).then(response => { return response })
            axios.get<ITasks>(process.env.REACT_APP_API + 'task')
            window.location.reload()
        }

    }

    const refreshList = () =>
    {
        axios.get<ITasks[]>(process.env.REACT_APP_API + 'task').then(response =>
        {
            setTasks(response.data)
        })
    }

    useEffect(() =>
    {
        refreshList()
    }, [addModal, editModal])

    return (
        <div>
            <h2 className="mt-4" >Tasks Overview</h2>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <th>Task Id</th>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th>Options</th>
                </thead>
                <tbody>
                    {tasks.map((t: ITasks) =>
                        <tr key={t.taskId}>
                            <td>{t.taskId}</td>
                            <td>{t.taskName}</td>
                            <td>{t.taskDescription}</td>
                            <td>{t.taskStartDate}</td>
                            <td>{t.taskDueDate}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info" onClick={() =>
                                    {
                                        setEditModal(true); setTaskid(t.taskId); setTaskName(t.taskName);
                                        setDescription(t.taskDescription); setStartDate(t.taskStartDate);
                                        setDueDate(t.taskDueDate);
                                    }
                                    }>Edit</Button>
                                    <Button className="mr-2" variant="info" onClick={() => { deleteTask(t.taskId) }} >Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary' onClick={toggleAddModal} >
                    Add Task</Button>
                <EditTaskModal isShown={editModal} hide={toggleEditModal} t={tObject} />
                <AddTaskModal isShown={addModal} hide={toggleAddModal} t={tObject} />
            </ButtonToolbar>
        </div >
    )
}
export default Tasks