import {useState,useEffect} from "react"
import { Home, Loading, Quiz,QuizComp } from './component'
import { nanoid } from 'nanoid'
import he from "he"
import './App.scss'

function App() {
  const [home,setHome] = useState(true)
  const [ques,setQuestion] = useState(() => null)
  const [formData,setFormData] = useState({
    amountOfQuestions:"",
    category: "",
    difficulty:""
  })
  
  const [checkAllAnswers,setCheckAllAnswers] = useState(false)
  const [resetQuiz,setResetQuiz] = useState(0)
  const [error,setError] = useState(0)
  const [isLoading,setIsLoading] = useState(true)

//when you click you show the quiz screen
function changeHome(){
  setHome(prev => !prev)
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
    }else if(amountOfQuestions === "" && category !== "" && difficulty === ""){
      apiLink = `https://opentdb.com/api.php?amount=5&category=${category}`
    }else if(amountOfQuestions !== "" && category !== "" && difficulty === ""){
      apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${category}`
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

        // if the question type is a boolean,use the length to sort so that 'True' will always be the first answer option
        // else just return the shuffled array
        shuffled = obj.type === "boolean" ? shuffled.sort((a,b) => a.value.length - b.value.length) : shuffled

        //add the shuffled array into the object
        return {...obj,correct_answer:correct_answer,question:he.decode(obj.question),shuffled:shuffled,id: nanoid()}
      })
      setQuestion(val)
      setError('')
      setTimeout(() => {
        setIsLoading(false)
      },1000)
    })
    .catch(err => setError(err.message))

  },[resetQuiz,amountOfQuestions,category,difficulty])

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
  let quiz = <QuizComp 
    Quiz={Quiz}
    ques ={ques}
    updateHeld = {updateHeld}
    checkAllAnswers = {checkAllAnswers}
    isLoading={isLoading}
    setCheckAllAnswers={setCheckAllAnswers}
    setHome={setHome}
    setResetQuiz={setResetQuiz} 
    setIsLoading={setIsLoading}
  />
  
    return (
        <main>
            {home ? 
              <div className='main-home'>
                <Home handleClick={changeHome} 
                formData={formData}
                setFormData={setFormData}
                />
              </div>
            :
            <div className="utility" style={{height:isLoading ? '95vh' : '100%'}}>
              {isLoading && <Loading error={error}/>}
              {!isLoading && quiz}
            </div>
            }
        </main>
    )
}

export default App;