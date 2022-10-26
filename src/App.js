import {useState,useEffect} from "react"
import { Home, Loading, Quiz,Reset } from './component'
import { nanoid } from 'nanoid'
import he from "he"
import './App.scss'

function App() {
  const [home,setHome] = useState(true)
  const [ques,setQuestion] = useState(null)
  const [formData,setFormData] = useState({
    amountOfQuestions:"",
    category: "",
    difficulty:""
  })
  const [allHeld,setAllHeld] = useState(false)
  const [totalScore,setTotalScore] = useState(0)
  const [checkAllAnswers,setCheckAllAnswers] = useState(false)
  const [resetQuiz,setResetQuiz] = useState(0)
  const [isLoading,setIsLoading] = useState(true)
  console.log(ques)
  console.log(totalScore)

//when you click you show the quiz screen
function changeHome(){
  setHome(prev => !prev)
}

//handle form
function handleFormChange(e){
  const {name, value} = e.target;
        
        setFormData(prev => {
            return {
                ...prev, [name] : value
            }
        })
}

//this useEffect tracks the questions to be set
const {amountOfQuestions,category, difficulty} = formData;

  useEffect(() => {
    let apiLink
    if(amountOfQuestions !== "" && category !== "" && difficulty !== ""){
      apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${category}&difficulty=${difficulty}`
    }else if(amountOfQuestions !== "" && category === '' && difficulty !== ""){
      apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}&difficulty=${difficulty}`
    }else if(amountOfQuestions !== "" && category === "" && difficulty === ""){
      apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}`
    }else{
      apiLink = 'https://opentdb.com/api.php?amount=5'
    }

    fetch(apiLink)
    .then(res => res.json())
    .then(data => {
      let val = data.results.map(obj => {
        //add both the correct & incorrect answers to to an array
        let incorrect_answers = [...obj.incorrect_answers].map(answer => (
          {value:he.decode(answer),id: nanoid(),isHeld: false, isCorrect: false}
        ))
        let correct_answer = {value:he.decode(obj.correct_answer),id: nanoid(), isHeld: false, isCorrect: true}
        let arr = [...incorrect_answers,correct_answer]
        //shuffle the array 
        let shuffled = arr.sort((a, b) => 0.5 - Math.random())
        //add the shuffled array into the object
        return {...obj,correct_answer:correct_answer,question:he.decode(obj.question),shuffled:shuffled,id: nanoid()}
      })
      setQuestion(val)

    })
    .catch(err => console.log(err.message))
    .finally(() => setIsLoading(false))
  },[resetQuiz,amountOfQuestions,category,difficulty])

  //  this useEffect tracks if all isHeld
  useEffect(() => {
    let isAllHeld = ques && ques.every(({shuffled}) => {
      return shuffled.some(({isHeld}) => isHeld === true)
    })
    if(isAllHeld){
      setAllHeld(true)
    }

    let score = ques && ques.map(({shuffled}) => {
      return shuffled.map(({isHeld,isCorrect}) => isHeld && isCorrect ? 1 : 0).reduce((acc,cu) => {
        return acc + cu
      },0)
    }).reduce((acc,cu) => acc + cu,0)
    setTotalScore(score)

    
  },[ques])
  //isHeld logic
  function updateHeld(qID, aID) {
    setQuestion(prevQuestion => {
        return prevQuestion.map( question => {
            if(qID !== question.id ){

                return question;
            } else {
                const newAnswers = question.shuffled.map(answer => {
                    return answer.id === aID 
                        ? {...answer, isHeld: !answer.isHeld}
                        : {...answer, isHeld: false};
                });
                
                return {...question, shuffled: newAnswers};
            }
        });
    });
}
  
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
  function changeTrue(){
    setCheckAllAnswers(prev => !prev)
  }
  
  // if allHeld state is false, isButtonDisabled will be set to true(so button will be disabled) & vice versa
  let isButtonDisabled = !allHeld
    return (
        <main>
            {home && <div className='main-home'>
              <Home handleClick={changeHome} 
              handleChange={handleFormChange}
              formData={formData}
              />
              </div>
            }
            {!home && <div className="utility">
              {isLoading && <Loading />}
              {quiz}
              {checkAllAnswers ?
               <Reset 
                  setCheckAllAnswers={setCheckAllAnswers}
                  setHome={setHome}
                  setAllHeld={setAllHeld}
                  setResetQuiz={setResetQuiz}
                  totalScore={totalScore} 
                  question={ques} 
                  //handleClick={reset}
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
            </div>
            }
        </main>
    )
}

export default App;

