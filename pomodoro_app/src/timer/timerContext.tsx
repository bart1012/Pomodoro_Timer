import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useTasks } from '../tasks/taskContext';
import type { Task, TimerContextType } from '../types';

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function useTimer(): TimerContextType {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
}

export function TimerProvider({ children }: { children: any }) {
    const { dispatch } = useTasks();
    const [workTime, setWorkTime] = useState<number>(25 * 60);
    const [userWorkTime, setUserWorkTime] = useState<number>(25 * 60);
    const [breakTime, setBreakTime] = useState<number>(5 * 60);
    const [longBreakTime, setLongBreakTime] = useState<number>(15 * 60);
    const [time, setTime] = useState<number>(workTime);
    const timeRef = useRef(workTime);

    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [isTaskLinked, setIsTaskLinked] = useState<boolean>(false);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const activeTaskTime = useRef<number | null | undefined>(null);
    const [currentStage, setCurrentStage] = useState<'work' | 'break' | 'long-break'>('work');
    const intervalRef = useRef<number | undefined>(undefined);
    const { tasks } = useTasks();


    useEffect(() => {
        if (currentStage === 'break' || currentStage === 'long-break') {
            document.getElementById('root')?.classList.add('break');
            document.body.classList.add('break');
        } else {
            document.body.classList.remove('break');
            document.getElementById('root')?.classList.remove('break');
        }
    }, [currentStage])

    useEffect(() => {
        timeRef.current = currentStage === 'work' ? workTime : currentStage === 'break' ? breakTime : longBreakTime;
        setTime(timeRef.current);
        if (!isTaskLinked) {
            setUserWorkTime(workTime);
        }
    }, [workTime, breakTime, longBreakTime])

    useEffect(() => {
        activeTaskTime.current = activeTask?.duration;
    }, [activeTask])

    // useEffect(() => {
    //     if (isTaskLinked) {
    //         const task = tasks.filter(task => task.isActive === true)[0];
    //         setActiveTask(task);
    //         timeRef.current = task.duration;
    //         setWorkTime(timeRef.current);
    //     } else {
    //         timeRef.current = userWorkTime;
    //         setWorkTime(userWorkTime);
    //     }
    // }, [isTaskLinked])

    function start() {

        intervalRef.current = setInterval(() => {

            if (timeRef.current > 0) {
                timeRef.current -= 1;
                setTime(timeRef.current);
                if (activeTask && isTaskLinked && currentStage === 'work') {
                    activeTaskTime.current = activeTaskTime.current ? activeTaskTime.current - 1 : activeTaskTime.current;
                    dispatch({
                        type: 'edit',
                        payload: {
                            ...activeTask, duration: activeTaskTime.current
                        }
                    });
                }
            } else {
                const ding = document.getElementById('ding') as HTMLAudioElement;
                if (ding) {
                    ding.currentTime = 0;
                    ding.play().catch(() => { }); // Avoid unhandled promise rejection
                }
                const isWorkTime: boolean = currentStage === 'work';
                setCurrentStage(isWorkTime ? 'break' : 'work');
                clearInterval(intervalRef.current);
                timeRef.current = isWorkTime ? breakTime : workTime;
                setTime(timeRef.current);
                setIsPaused(true);
                const el = document.getElementById('timer');
                el?.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.25)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 1250,
                    fill: 'forwards',
                    easing: 'ease-out'
                });

            }

        }, 5);

    }

    function stop() {
        clearInterval(intervalRef.current);
    }

    function reset() {
        clearInterval(intervalRef.current);
        timeRef.current = currentStage === 'work' ? workTime : breakTime;
        setTime(timeRef.current);
    }

    return (<TimerContext.Provider value={{ setUserWorkTime, activeTask, setActiveTask, setIsTaskLinked, time, start, stop, reset, currentStage, isPaused, setIsPaused, setWorkTime, workTime, setBreakTime, setLongBreakTime, breakTime, longBreakTime, isTaskLinked }}>
        <audio id="ding" src="./ding-sound.mp3" preload="auto" />
        {children}
    </TimerContext.Provider>)
}