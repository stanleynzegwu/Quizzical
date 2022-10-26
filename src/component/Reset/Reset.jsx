import './Reset.scss'

const Reset = ({setCheckAllAnswers,setHome,setAllHeld,setResetQuiz,totalScore,question,setIsLoading}) => {
    function reset(){
        setCheckAllAnswers(prev => !prev)
        setHome(prev => !prev)
        setAllHeld(prev => !prev)
        setResetQuiz(prev => prev + 1)
        setIsLoading(prev => !prev)
      }

    return ( 
        <div className='reset'>
            <h4>You scored {totalScore}/{question.length}</h4>
            <button className="quiz-btn btn" onClick={reset}>Play Again</button>
        </div>
     );
}
 
export default Reset;