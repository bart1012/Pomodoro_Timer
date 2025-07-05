import React, { useState } from 'react';
import './tasks.css';
import { useTasks } from './taskContext';
import type { Action } from '../types';


type AddTaskFormProps = {
    onCancel: () => void;
};

export default function AddTaskForm({ onCancel }: AddTaskFormProps) {
    const [name, setName] = useState("");
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const { dispatch } = useTasks();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const totalSeconds = (hours * Math.pow(60, 2)) + (minutes * 60);
        if (!name || totalSeconds <= 0) return;

        dispatch({
            type: 'add',
            payload: { name: name, duration: totalSeconds, originalDuration: totalSeconds }
        });
        setName("");
        setHours(0);
        setMinutes(0);
        onCancel();
    }


    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <div className="form-input-container">

                <fieldset className="settings-group">
                    <legend className="settings-title">Task Name</legend>
                    <div className="settings-input">
                        <label className="settings-label" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                            <input
                                type="text"
                                placeholder="Enter task name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </fieldset>


                <fieldset className="settings-group">
                    <legend className="settings-title">Duration</legend>
                    <div className="settings-input">
                        <label className="settings-label">
                            <span>Hours</span>
                            <input
                                className="number-input"
                                type="number"
                                min="0"
                                max="23"
                                placeholder="0"
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                required
                            />
                        </label>
                        <label className="settings-label">
                            <span>Minutes</span>
                            <input
                                className="number-input"
                                type="number"
                                min="0"
                                max="59"
                                placeholder="0"
                                value={minutes}
                                onChange={(e) => setMinutes(Number(e.target.value))}
                                required
                            />
                        </label>
                    </div>
                </fieldset>

            </div>

            <div className="form-btn-container">
                <button className="form-btn" type="submit">Add</button>
                <button className="form-btn" type="reset" onClick={onCancel}>Cancel</button>
            </div>
        </form>

    );
}
