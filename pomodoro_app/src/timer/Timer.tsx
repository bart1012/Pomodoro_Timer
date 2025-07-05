import {useTimer} from "./timerContext.tsx"
import './Timer.css'
import '../colourSchemes.css'
import { useRef } from "react"
import type {Time} from '../types.ts'

export default function Timer(){

    const {time, start, stop, reset, isPaused, setIsPaused, currentStage} : any = useTimer();
    const timeDisplay : Time = {
        hours: Math.floor(time / 3600),
        minutes: Math.floor(time / 60) % 60,
        seconds: time % 60
    }
    const audioRef = useRef<any>(null);

    function PlayClickSound(){
        audioRef.current?.play();
    }

    function handleStartStopClick(){
        PlayClickSound();
        setIsPaused(!isPaused);
        if(isPaused){
            start();
        }else{       
            stop();
        }
    }
    
    function handleResetClick(){
        PlayClickSound();
        setIsPaused(true);
        reset();
    }

    return<>
        <audio id='click-audio' ref={audioRef}>
            <source src='./ui-click.mp3' type="audio/mpeg"></source>
        </audio>
         <h1 id='timer'>
                {timeDisplay.hours > 0 && <>
                    <span>{timeDisplay.hours < 10 ? '0' + timeDisplay.hours : timeDisplay.hours}</span>
                    <span>:</span>
                </>}
        
                <span>{timeDisplay.minutes < 10 ? '0' + timeDisplay.minutes : timeDisplay.minutes}</span>
                <span>:</span>
             
                <span>{timeDisplay.seconds < 10 ? '0' + timeDisplay.seconds : timeDisplay.seconds}</span>
        </h1>
        <div id='timer-controls'>
            <button onClick={handleStartStopClick} className={currentStage === 'work' ? 'focus-dark' : 'break-dark'}>{isPaused ? 'Start' : 'Pause'}</button>
            <button onClick={handleResetClick} className={currentStage === 'work' ? 'focus-dark' : 'break-dark'}>Reset</button>
        </div>          
    </>
}