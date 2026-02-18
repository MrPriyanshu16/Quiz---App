import { useCallback, useState } from 'react';
import QUESTIONS from '../Questions.js';
import quizcomplete from '../assets/quiz-complete.png';
import QuizTimer from './QuizTimer.jsx';
export default function Quiz() {
    const [usersAnswer, setUsersAnswer] = useState([])
    const activeQuestionsIndex = usersAnswer.length;
    const quizIsComplete = activeQuestionsIndex === QUESTIONS.length
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUsersAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });
    }, []);
    
    const handleSkippedAnswer = useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer]);
    
    if (quizIsComplete) {
        return (
            <div id='summary'>
                <img src={quizcomplete} alt='trophyicon' />
                <h2>Quiz is Completed</h2>
            </div>
        );
    }
    const shuffledAnswers = [...QUESTIONS[activeQuestionsIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5);
    return (
        <div id="quiz">
            <div id='questions'>
                <QuizTimer timeout={10000} onTimeout={handleSkippedAnswer} />
                <h2>{QUESTIONS[activeQuestionsIndex].text}</h2>
                <ul id='answers'>
                    {shuffledAnswers.map((answers) => (
                        <li key={answers} className='answer'>
                            <button onClick={() => handleSelectAnswer(answers)}>{answers}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}