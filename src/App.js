import {useState,useEffect} from "react"
import Home from "./component/Home"
import Quiz from "./component/Quiz"
import Reset from "./component/Reset"
import { nanoid } from 'nanoid'
import he from "he"

function App() {
  const [home,setHome] = useState(true)
  const [ques,setQuestion] = useState(null)
  const [formData,setFormData] = useState({
    amountOfQuestions:"",
    category: "",
    difficulty:""
  })
  const [allHeld,setAllHeld] = useState(false)
  const [isCorrectAnswer,setIsCorrectAnswer] = useState(0)
  const [checkAllAnswers,setCheckAllAnswers] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  console.log(ques)
  console.log(isCorrectAnswer)

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
  },[amountOfQuestions,category,difficulty])

  //  this useEffect tracks if all isHeld
  useEffect(() => {
    let isAllHeld = ques && ques.every(({shuffled}) => {
      return shuffled.some(({isHeld}) => isHeld === true)
    })
    if(isAllHeld){
      setAllHeld(true)
    }

    let answeredCorrectly = ques && ques.map(({shuffled}) => {
      return shuffled.map(({isHeld,isCorrect}) => isHeld && isCorrect ? 1 : 0).reduce((acc,cu) => {
        return acc + cu
      },0)
    }).reduce((acc,cu) => acc + cu,0)
    setIsCorrectAnswer(answeredCorrectly)

    
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
              {quiz}
              {checkAllAnswers ?
               <Reset isCorrectAnswer={isCorrectAnswer} questionLength={ques}/> :
               <button className="quiz-btn btn"
               onClick={changeTrue}
               disabled={isButtonDisabled}
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

