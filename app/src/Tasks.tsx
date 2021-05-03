import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import { ITasks } from './interfaces'
import TaskModal from './TaskModal'

const Tasks: React.FC<ITasks> = () =>
{
    const [tasks, setTasks] = useState<ITasks[]>([])
    const [showModal, setShowModal] = useState(false);
    const [taskid, setTaskid] = useState<number>()
    const [taskName, setTaskName] = useState<string>()
    const [taskDescription, setDescription] = useState<string>()
    const [taskStartDate, setStartDate] = useState<string>()
    const [taskDueDate, setDueDate] = useState<string>()
    const [pageUpdate, setPageUpdate] = useState(false)
    const [modal, setModal] = useState<string>('add')
    const tObject = {
        taskName: taskName ? taskName : '',
        taskDescription: taskDescription ? taskDescription : '',
        taskId: taskid ? taskid : 0,
        taskStartDate: taskStartDate ? taskStartDate : '',
        taskDueDate: taskDueDate ? taskDueDate : ''
    }

    const toggleModal = () =>
    {
        setShowModal(!showModal)
        setPageUpdate(true)
    };

    const deleteTask = (id: number | undefined) =>
    {
        if (id)
        {
            axios.delete<number>(process.env.REACT_APP_API + 'task/' + id).then(response => { return response })
            setPageUpdate(true)
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
        setPageUpdate(false)
    }, [pageUpdate, showModal])

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
                                <ButtonToolbar className="justify-content-center">
                                    <Button className="mr-2" variant="info" onClick={() =>
                                    {
                                        setShowModal(true);
                                        setModal('edit')
                                        setTaskid(t.taskId);
                                        setTaskName(t.taskName);
                                        setDescription(t.taskDescription);
                                        setStartDate(t.taskStartDate);
                                        setDueDate(t.taskDueDate);
                                    }
                                    }>Edit</Button>
                                    <Button className="mr-2" variant="info" onClick={() =>
                                    {
                                        setModal('duplicate');
                                        setShowModal(true);
                                        setTaskid(t.taskId);
                                        setTaskName(`Copy of ${t.taskName}`);
                                        setDescription(t.taskDescription);
                                        setStartDate(t.taskStartDate);
                                        setDueDate(t.taskDueDate);
                                    }
                                    }>Duplicate</Button>
                                    <Button className="mr-2" variant="info" onClick={() => { deleteTask(t.taskId); setPageUpdate(true) }} >Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary' onClick={() => { setShowModal(true); setModal('add') }} >
                    Add Task</Button>
                < TaskModal isShown={showModal} hide={toggleModal} t={tObject} modalType={modal} />
            </ButtonToolbar>
        </div >
    )
}
export default Tasks