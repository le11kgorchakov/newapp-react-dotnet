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
    t: ITasks
    isShown: boolean
    hide: any
}


export interface IUserModal
{
    u: IUsers
    isShown: boolean
    hide: any
}
