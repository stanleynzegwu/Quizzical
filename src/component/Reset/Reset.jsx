import './Reset.scss'

const Reset = ({setCheckAllAnswers,setHome,setAllHeld,setResetQuiz,totalScore,question}) => {
    function reset(){
        setCheckAllAnswers(prev => !prev)
        setHome(prev => !prev)
        setAllHeld(prev => !prev)
        setResetQuiz(prev => prev + 1)
      }

    return ( 
        <div>
            <h4>You scored {totalScore}/{question.length}</h4>
            <button className="quiz-btn btn" onClick={reset}>Reset Game</button>
        </div>
     );
}
 
export default Reset;