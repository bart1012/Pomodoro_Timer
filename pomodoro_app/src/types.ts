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


export interface TimerContextType {
  setUserWorkTime: React.Dispatch<React.SetStateAction<number>>;
  activeTask: Task | null;
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setIsTaskLinked: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  currentStage: 'work' | 'break' | 'long-break';
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkTime: React.Dispatch<React.SetStateAction<number>>;
  workTime: number;
  setBreakTime: React.Dispatch<React.SetStateAction<number>>;
  setLongBreakTime: React.Dispatch<React.SetStateAction<number>>;
  breakTime: number;
  longBreakTime: number;
  isTaskLinked: boolean;
}
