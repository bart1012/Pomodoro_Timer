import React, { useEffect, useState } from 'react';
import './timerSettings.css';
import { useTimer } from './timerContext';
import '../colourSchemes.css'

export default function TimerSettings() {

    const { workTime, currentStage, setWorkTime, setBreakTime, setLongBreakTime, breakTime, longBreakTime, setIsTaskLinked }: any = useTimer();
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<number>(workTime / 60);
    const [shortBreak, setShortBreak] = useState<number>(breakTime / 60);
    const [longBreak, setLongBreak] = useState<number>(longBreakTime / 60);


    return (<>
        {isModalActive && <div className="modal-overlay">
            <div className="modal">
                <h2>Settings</h2>
                <div className="settings-container">
                    <fieldset className="settings-group">
                        <legend className="settings-title">Time (minutes)</legend>
                        <div className="settings-input">
                            <label className="settings-label">
                                Pomodoro
                                <input type="number" min="0" step="1" className="settings-number" value={pomodoro} onChange={(e) => { setPomodoro(e.target.valueAsNumber); setWorkTime(e.target.valueAsNumber * 60) }} />
                            </label>
                        </div>
                        <div className="settings-input">
                            <label className="settings-label">
                                Short Break
                                <input type="number" min="0" step="1" className="settings-number" value={shortBreak} onChange={(e) => { setShortBreak(e.target.valueAsNumber); setBreakTime(e.target.valueAsNumber * 60) }} />
                            </label>
                        </div>
                        <div className="settings-input">
                            <label className="settings-label">
                                Long Break
                                <input type="number" min="0" step="1" className="settings-number" value={longBreak} onChange={(e) => { setLongBreak(e.target.valueAsNumber); setLongBreakTime(e.target.valueAsNumber * 60) }} />
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className="settings-group">
                        <legend className="settings-title">Auto Start Breaks</legend>
                        <div className="settings-input">
                            <label className="settings-label">
                                Enable
                                <input type="checkbox" className="settings-checkbox" />
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className="settings-group">
                        <legend className="settings-title">Auto Start Pomodoros</legend>
                        <div className="settings-input">
                            <label className="settings-label">
                                Enable
                                <input type="checkbox" className="settings-checkbox" />
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className="settings-group">
                        <legend className="settings-title">Long Break Interval</legend>
                        <div className="settings-input">
                            <label className="settings-label">
                                Interval
                                <input type="number" min="1" step="1" className="settings-number" value="4" />
                            </label>
                        </div>
                    </fieldset>
                </div>


                <button onClick={() => setIsModalActive(!isModalActive)}>Close</button>
            </div>
        </div>}
        <button onClick={() => setIsModalActive(!isModalActive)} id='settings-btn' className={currentStage === 'work' ? 'focus-dark' : 'break-dark'}>
            <div className='btn-text-container'>
                Settings
            </div>
            <svg fill="white" width={20} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.973 45.973"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815 C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607 c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128 c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85 C30.906,27.334,27.355,30.85,22.976,30.85z"></path> </g> </g> </g></svg>
        </button>
        <label id="link-timer-btn" className={`custom-checkbox ${currentStage === 'work' ? 'focus-dark' : 'break-dark'}`}>
            <input type="checkbox" className="hidden-checkbox" onChange={(e)=>setIsTaskLinked(e.target.checked)} />
            <span className="custom-checkmark"></span>
            <div className="btn-text-container">Link Task</div>
        </label>


    </>)
}