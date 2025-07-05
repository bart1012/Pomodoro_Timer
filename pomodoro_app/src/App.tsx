import { useState } from 'react'
import './App.css'
import Timer from './timer/Timer.tsx'
import './colourschemes.css'
import { TimerProvider } from './timer/timerContext.tsx'
import TimerSettings from './timer/TimerSettings.tsx'
import { TaskProvider } from './tasks/taskContext.tsx'
import TaskList from './tasks/TaskList.tsx'

function App() {
  return (
    <TaskProvider>
      <TimerProvider>
        <Timer></Timer>
        <TimerSettings></TimerSettings>
        <TaskList></TaskList>
      </TimerProvider>
    </TaskProvider>
  )
}

export default App
