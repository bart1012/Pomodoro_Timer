import { useState } from "react";
import { useTimer } from "../timer/timerContext";
import type { Task } from "../types";
import type { Time} from "../types";
import { useTasks } from "./taskContext";
import './tasks.css'

export default function TaskCard({ task, onDelete }: { task: Task, onDelete: (id: number) => void }) {
    const [totalTime] = useState({
        hours: Math.floor(task.originalDuration / 3600),
        minutes: Math.floor(task.originalDuration / 60) % 60,
        seconds: task.originalDuration % 60
    });
    const taskTime = task.duration;
    const { activeTask } = useTimer();
    const { dispatch } = useTasks();
    const isActive = activeTask?.id === task.id;
    const timeDisplay: Time = {
        hours: Math.floor(taskTime / 3600),
        minutes: Math.floor(taskTime / 60) % 60,
        seconds: taskTime % 60
    };

    function onReset() {
        dispatch({
            type: 'edit',
            payload: {
                ...task, duration: task.originalDuration
            }
        });
    }

    return (
        <div className={"task-card " + (isActive ? "active" : "not-active")}>
            <div className="task-content">
                <h2 className="task-card-title">{task.name}</h2>
                <p><small>
                    Total Time: <span> </span>
                        {totalTime.hours > 0 && <>
                            <span>{totalTime.hours < 10 ? '0' + totalTime.hours : totalTime.hours}</span>
                            <span>:</span>
                        </>}
                        <span>{totalTime.minutes < 10 ? '0' + totalTime.minutes : totalTime.minutes}</span>
                        <span>:</span>
                        <span>{totalTime.seconds < 10 ? '0' + totalTime.seconds : totalTime.seconds}</span>
                </small>
                </p>
                <span>Time Remaining: </span>
                <p className="task-card-duration">
                    {timeDisplay.hours > 0 && <>
                        <span>{timeDisplay.hours < 10 ? '0' + timeDisplay.hours : timeDisplay.hours}</span>
                        <span>:</span>
                    </>}

                    <span>{timeDisplay.minutes < 10 ? '0' + timeDisplay.minutes : timeDisplay.minutes}</span>
                    <span>:</span>

                    <span>{timeDisplay.seconds < 10 ? '0' + timeDisplay.seconds : timeDisplay.seconds}</span>
                </p>
            </div>
            {isActive && <div className="task-btn-container">
                <button className="task-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391zm-80 80v-170l528-527q12-11 26.5-17t30.5-6 31 6 26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120zm640-584-56-56zm-141 85-28-29 57 57z" /></svg></button>
                <button className="task-btn" onClick={onReset}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480t-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77 77 114T840-480t-28.5 140.5-77 114-114 77T480-120m112-192L440-464v-216h80v184l128 128z" /></svg></button>
                <button className="task-btn" onClick={() => onDelete(task.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120zm400-600H280v520h400zM360-280h80v-360h-80zm160 0h80v-360h-80zM280-720v520z" /></svg></button>
            </div>}

        </div>
    );
}

