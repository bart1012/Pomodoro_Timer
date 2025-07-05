export type Task = {
    id: number,
    name: string,
    duration: number,
    originalDuration : number,
    isActive: boolean
}

export type Action = 
| {
    type: 'add' | 'edit',
    payload: Task
} | {
    type: 'remove' | 'activate',
    payload: number
} 


export type Time = {
    hours : number,
    minutes : number,
    seconds : number
}