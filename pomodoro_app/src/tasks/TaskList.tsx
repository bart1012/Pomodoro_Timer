import { useState } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "./taskContext";
import './tasks.css'
import AddTaskForm from "./AddTaskForm";
import { useTimer } from "../timer/timerContext";
import type { Task } from "../types";


export default function TaskList() {
    const { tasks, dispatch } = useTasks();
    const { setActiveTask } = useTimer();
    const [addTaskIsActive, setAddTaskIsActive] = useState<boolean>(false);

    function onDelete(id: number) {
        dispatch({
            type: 'remove',
            payload: id
        });
    }

    return (<>
        <ul className="task-list">
            {tasks.map((item : Task) => (
                <li
                    style={{ cursor: "pointer" }}
                    key={item.id}
                    onClick={() => {
                        dispatch({
                            type: 'activate',
                            payload: item.id
                        });
                        setActiveTask(item);    
                    }}
                >
                    <TaskCard onDelete={onDelete} task={item} />
                </li>
            ))}

        </ul>

        {addTaskIsActive ? <AddTaskForm onCancel={() => setAddTaskIsActive(false)}></AddTaskForm> : <button className="add-task-btn" onClick={() => setAddTaskIsActive(!addTaskIsActive)}>
            <h2 className="task-card-title">Add Task</h2>
            <p className="task-card-duration"></p>
        </button>}
    </>)
}

