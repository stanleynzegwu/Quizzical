import {useState,useEffect} from 'react'
import { nanoid } from 'nanoid'

export default function Quiz({qID,question,allAnswers,updateHeld,checkAllAnswers}){
    
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