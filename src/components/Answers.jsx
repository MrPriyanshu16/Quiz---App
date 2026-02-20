import { useRef } from 'react';
export default function Answer({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id='answers'>
            {shuffledAnswers.current.map((answers) => {
                const isSelected = selectedAnswer === answers;
                let cssSelect = '';
                if (answerState === 'answered' && isSelected) {
                    cssSelect = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssSelect = answerState;
                }
                return (<li key={answers} className='answer'>
                    <button onClick={() => onSelect(answers)} className={cssSelect} disabled={answerState !== ''}>{answers}</button>
                </li>);
            })}
        </ul>
    );
}