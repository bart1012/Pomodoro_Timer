import { createContext, useContext, useReducer, useState, type Dispatch, type ReactNode } from "react";
import type { Task } from '../types.ts';
import taskReducer from "./taskReducer.ts";


const TaskContext = createContext<any>(undefined);

export function useTasks() {
    return useContext(TaskContext);
}

export function TaskProvider({ children }: { children: ReactNode }) {

    const [tasks, dispatch] = useReducer(taskReducer, []);


    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    )

}