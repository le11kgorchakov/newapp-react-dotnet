export interface ITasks
{
    taskId: number
    taskName: string
    taskDescription: string
}

export interface IUsers
{
    userId: number
    userName: string
    userLastName: string
    fileName: string
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
