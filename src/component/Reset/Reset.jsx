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
            <div className='reset__div reset__text'>
                <h4 className='reset-h4'>You scored {totalScore}/{question.length}</h4>
            </div>
            <div className='reset__div reset__btn'>
                <button className="quiz-btn btn" onClick={reset}>Play Again</button>
            </div>
        </div>
     );
}
 
export default Reset;