const Reset = ({isCorrectAnswer,questionLength}) => {
    return ( 
        <div>
            <h4>You scored {isCorrectAnswer}/{questionLength.length}</h4>
            <button className="quiz-btn btn">Reset Game</button>
        </div>
     );
}
 
export default Reset;