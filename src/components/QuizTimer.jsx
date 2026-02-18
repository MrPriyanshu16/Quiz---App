import { useState, useEffect } from 'react';
export default function QuizTimer({onTimeout, timeout}){
    const[remainingTime, setRemaingTime] = useState(timeout);

    useEffect(()=>{
        const timer = setTimeout(onTimeout, timeout);
        return ()=>{
            clearTimeout(timer);
        }
    },[timeout,onTimeout]);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setRemaingTime((prevRemaingTime)=>prevRemaingTime-100);
        },100);
        return ()=>{
            clearInterval(interval);
        }
    },[]);

    return <progress id='question-time' max={timeout} value={remainingTime}/>;
}