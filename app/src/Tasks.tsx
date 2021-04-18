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
    const tObject = {
        taskName: taskName ? taskName : '', taskDescription: taskDescription ? taskDescription : '', taskId: taskid ? taskid : 0
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

    const deleteDep = (id: number | undefined) =>
    {
        refreshList()
        if (id)
        {
            axios.delete(process.env.REACT_APP_API + 'task/' + id).then(response => { return response })
        }
        refreshList()
    }

    const refreshList = () =>
    {
        axios.get(process.env.REACT_APP_API + 'task').then(response =>
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
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <th>TaskId</th>
                    <th>TaskName</th>
                    <th>TaskDescription</th>
                    <th>Options</th>
                </thead>
                <tbody>
                    {tasks.map((t: ITasks) =>
                        <tr key={t.taskId}>
                            <td>{t.taskId}</td>
                            <td>{t.taskName}</td>
                            <td>{t.taskDescription}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info" onClick={() =>
                                    {
                                        setEditModal(true); setTaskid(t.taskId); setTaskName(t.taskName); setDescription(t.taskDescription)
                                    }
                                    }>Edit</Button>
                                    <Button className="mr-2" variant="info" onClick={() => { deleteDep(t.taskId) }} >Delete</Button>
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