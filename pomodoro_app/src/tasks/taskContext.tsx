import { createContext, useContext, useReducer,  type ReactNode } from "react";
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