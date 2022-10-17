const Reset = ({isCorrectAnswer,questionLength,handleClick}) => {
    return ( 
        <div>
            <h4>You scored {isCorrectAnswer}/{questionLength.length}</h4>
            <button className="quiz-btn btn" onClick={handleClick}>Reset Game</button>
        </div>
     );
}
 
export default Reset;