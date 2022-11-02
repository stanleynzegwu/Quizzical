import { useState,useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Quiz,Reset} from '../index'
const QuizComp = ({ques,updateHeld,checkAllAnswers,isLoading,setCheckAllAnswers,setHome,setResetQuiz,setIsLoading}) => {
//,allHeld,setAllHeld,totalScore,setTotalScore
const [allHeld,setAllHeld] = useState(false)
const [totalScore,setTotalScore] = useState(0)

     function changeTrue(){
          setCheckAllAnswers(prev => !prev)
     }

     //  this useEffect tracks if all isHeld
     useEffect(() => {
        let isAllHeld = ques && ques.every(({shuffled}) => {
          return shuffled.some(({isHeld}) => isHeld === true)
        })
        //if all isHeld, change the state of allHeld to true
        if(isAllHeld){
          setAllHeld(true)
        }
     
        let score = ques && ques.map(({shuffled}) => {
          return shuffled.map(({isHeld,isCorrect}) => isHeld && isCorrect ? 1 : 0).reduce((acc,cu) => {
            return acc + cu
          },0)
        }).reduce((acc,cu) => acc + cu,0)
        setTotalScore(score)

      },[ques,setTotalScore,setAllHeld])

     const quiz = ques && ques.map((data,index) => (
          <Quiz 
            key = {nanoid()}
            qID = {data.id}
            question = {data.question}
            allAnswers = {data.shuffled}
            type = {data.type}
            questionIndex = {index}
            updateHeld = {updateHeld}
            checkAllAnswers = {checkAllAnswers}
          />
     ))
// if allHeld state is false, isButtonDisabled will be set to true(so button will be disabled) & vice versa
let isButtonDisabled = !allHeld

    return ( 
        <>
             {quiz}

             {checkAllAnswers ?
               <Reset 
                  setCheckAllAnswers={setCheckAllAnswers}
                  setHome={setHome}
                  setAllHeld={setAllHeld}
                  setResetQuiz={setResetQuiz}
                  totalScore={totalScore} 
                  question={ques}
                  setIsLoading={setIsLoading}
               />
               :
               <button className="quiz-btn btn"
               onClick={changeTrue}
               disabled={isButtonDisabled}
               style={isLoading ? {display:'none'} : {display:'block'}}
               >
                 Check answers
               </button>
             }
             
        </>
     );
}
 
export default QuizComp;