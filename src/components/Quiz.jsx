import { useCallback, useState } from 'react';
import QUESTIONS from '../Questions.js';
import Summary from './Summary.jsx';
import Question from './Question.jsx';
export default function Quiz() {
    const [usersAnswer, setUsersAnswer] = useState([])
    const activeQuestionsIndex = usersAnswer.length;
    const quizIsComplete = activeQuestionsIndex === QUESTIONS.length


    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUsersAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });
    }, []);

    const handleSkippedAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <Summary usersAnswer={usersAnswer}/>
    }
    
    return (
        <div id="quiz">
            <Question
            key = {activeQuestionsIndex} 
            index = {activeQuestionsIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkippedAnswer}
            />
        </div>
    )
}