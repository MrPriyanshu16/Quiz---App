import quizcomplete from '../assets/quiz-complete.png';
import QUESTIONS from '../Questions.js';
export default function Summary({ usersAnswer }) {
    const skippedAnswer = usersAnswer.filter((answer)=> answer === null);
    const correctAnswer = usersAnswer.filter((answer,index)=> answer === QUESTIONS[index].answers[0]);
    
    const skippedAnswerShare = Math.round((skippedAnswer.length / usersAnswer.length) * 100);
    const correctAnswerShare = Math.round((correctAnswer.length / usersAnswer.length) * 100);
    const wrongAnswerShare = 100 - skippedAnswerShare - correctAnswerShare;
    
    return <div id='summary'>
        <img src={quizcomplete} alt='trophyicon' />
        <h2>Quiz is Completed</h2>
        <div id="summary-stats">
            <p>
                <span className="number">
                    {skippedAnswerShare}%
                </span>
                <span className="text">skipped</span>
            </p>
            <p>
                <span className="number">
                    {correctAnswerShare}%
                </span>
                <span className="text">answer correctly</span>
            </p>
            <p>
                <span className="number">
                    {wrongAnswerShare}%
                </span>
                <span className="text">answer incorrectly</span>
            </p>
            <ol>
                {usersAnswer.map((answer, index) => {
                    let cssClass = 'user-answer';
                    if (answer === null){
                        cssClass += ' skipped';
                    }else if(answer === QUESTIONS[index].answers[0]){
                        cssClass += ' correct';
                    }else {
                        cssClass += ' wrong';
                    }
                    return (
                        <li key = {index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer}</p>
                        </li>
                    );
                })}

            </ol>
        </div>
    </div>
}