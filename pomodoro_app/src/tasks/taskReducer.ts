import type { Task, Action } from '../types.ts';


export default function taskReducer(state : Task[], action : Action){
    switch (action.type){
        case 'add': return [...state, {...action.payload, id: state.length + 1}];
        case 'remove': return state.filter((item) => item.id !== action.payload);
        case 'activate': return state.map(item => {
            if(item.id === action.payload){
                return {...item, isActive: true};
            }else{
                return {...item, isActive: false};
            }
        })
        case 'edit': return state.map(item => {
            if(item.id === action.payload.id){
                return action.payload;
            }else{
                return item;
            }
        })
        default: return state; 
    }
}