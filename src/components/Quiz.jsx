import { useCallback, useState } from 'react';
import QUESTIONS from '../Questions.js';
import quizcomplete from '../assets/quiz-complete.png';
import QuizTimer from './QuizTimer.jsx';
import Answers from './Answers.jsx'; 
export default function Quiz() {
    const [answeredState, setAnsweredState] = useState('');
    const [usersAnswer, setUsersAnswer] = useState([])
    const activeQuestionsIndex = answeredState === '' ? usersAnswer.length : usersAnswer.length - 1;
    const quizIsComplete = activeQuestionsIndex === QUESTIONS.length


    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnsweredState('answered');
        setUsersAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionsIndex].answers[0]) {
                setAnsweredState('correct');
            } else {
                setAnsweredState('wrong');
            }
            setTimeout(() => {
                setAnsweredState('');
            }, 2000)
        })
    }, [activeQuestionsIndex]);

    const handleSkippedAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <div id='summary'>
                <img src={quizcomplete} alt='trophyicon' />
                <h2>Quiz is Completed</h2>
            </div>
        );
    }
    
    return (
        <div id="quiz">
            <div id='questions'>
                <QuizTimer key={activeQuestionsIndex} timeout={10000} onTimeout={handleSkippedAnswer} />
                <h2>{QUESTIONS[activeQuestionsIndex].text}</h2>
                <Answers 
                key = {activeQuestionsIndex}
                answers = {QUESTIONS[activeQuestionsIndex].answers}
                selectedAnswer = {usersAnswer[usersAnswer.length - 1]}
                answerState = {answeredState}
                onSelect={handleSelectAnswer}
                />
            </div>
        </div>
    )
}