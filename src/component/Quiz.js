import {useState,useEffect} from 'react'
import { nanoid } from 'nanoid'

export default function Quiz({qID,question,allAnswers,updateHeld,checkAllAnswers}){
    
    //const [showAnswer,setShowAnswer] = useState(true)
    // function show(e){
    //     console.log(e.target.getAttribute('id'))
    //     console.log(e.target.innerText)
    //     console.log(e.target.className)
    //     //console.log(e.target.id)
    // }
    
    let quiz = <div className="quiz">
                    <h3 className="quiz__heading">{question}</h3>
                    <div className="quiz__answer-holder">
                        {allAnswers.map(answerObj => {
                            let isHeld = answerObj.isHeld ? 'isHeld' : 'notHeld'
                            let endOfGame = answerObj.isHeld && answerObj.isCorrect ? 'correct' : 
                            answerObj.isHeld && !answerObj.isCorrect ?  'inCorrect' :
                            !answerObj.isHeld && answerObj.isCorrect ?  'correctButUnheld' :
                            'nothing'
                            
                            let style = checkAllAnswers ? endOfGame : isHeld
                          return <button 
                          onClick={() => updateHeld(qID,answerObj.id)}
                          //if you have clicked to check all answers, then each anser button will be diabled so it can't be changed.
                          disabled={checkAllAnswers ? true : false}
                          key={nanoid()}
                          className={`${style} answer`}
                          >
                            {answerObj.value}
                            </button>
                        })}
                    </div>
                </div>
    
    return (
        <>
            {quiz}
        </>
    )
}

/*{ <>
            {!showAnswer ? <div className="quiz">
                <h3 className="quiz__heading">{question}</h3>
                <div className="quiz__answer-holder">
                    {allAnswers[0] && <span className="1 quiz-one answer" >{allAnswers[0].value}</span>}
                    {allAnswers[1] && <span className="2 quiz-two answer" >{allAnswers[1].value}</span>}
                    {allAnswers[2] && <span className="3 quiz-three answer" >{allAnswers[2].value}</span>}
                    {allAnswers[3] && <span className="4 quiz-four answer" >{allAnswers[3].value}</span>}
                </div>
            </div> : <>{quiz}</>
            }
        </> }*/