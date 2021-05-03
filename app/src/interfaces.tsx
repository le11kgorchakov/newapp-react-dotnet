export interface ITasks
{
    taskId: number
    taskName: string
    taskDescription: string
    taskStartDate: string
    taskDueDate: string
}

export interface IUsers
{
    userId: number
    userName: string
    userLastName: string
    fileName: string
    taskName?: string
}

export interface ITaskModal
{
    modalType: string
    t: ITasks
    isShown: boolean
    hide: (() => void)
}


export interface IUserModal
{
    modalType: string
    u: IUsers
    isShown: boolean
    hide: any
}
