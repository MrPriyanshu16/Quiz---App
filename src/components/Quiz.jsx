import { useState } from 'react';
import QUESTIONS from '../Questions.js';
export default function Quiz() {
    const [usersAnswer, setUsersAnswer] = useState([])
    const activeQuestionsIndex = usersAnswer.length;

    function handleSelectAnswer(selectedAnswer) {
        setUsersAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });
    }
    return (
        <div id="quiz">
            <div id='questions'>
                <h2>{QUESTIONS[activeQuestionsIndex].text}</h2>
                <ul id='answers'>
                    {QUESTIONS[activeQuestionsIndex].answers.map((answers) => (
                        <li key={answers} className='answer'>
                            <button onClick={() => handleSelectAnswer(answers)}>{answers}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}