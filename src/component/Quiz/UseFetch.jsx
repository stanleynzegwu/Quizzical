// import { useState,useEffect } from "react"
// import { nanoid } from 'nanoid'
// import he from "he"

// const UseFetch = (formData) => {

// const [data,setData] = useState(null)
// const [isLoading,setIsLoading] = useState(true)
// const {amountOfQuestions,category, difficulty} = formData;

//     useEffect(() => {

//       let apiLink
// if(amountOfQuestions !== "" && category !== "" && difficulty !== ""){
//   apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${category}&difficulty=${difficulty}`
// }else if(amountOfQuestions !== "" && category === '' && difficulty !== ""){
//   apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}&difficulty=${difficulty}`
// }else if(amountOfQuestions !== "" && category === "" && difficulty === ""){
//   apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}`
// }else{
//   apiLink = 'https://opentdb.com/api.php?amount=5'
// }

// fetch(apiLink)
// .then(res => res.json())
// .then(data => {
//   console.log(data.results)
//   let val = data.results.map(obj => {
//     //add both the correct & incorrect answers to to an array
//     let incorrect_answers = [...obj.incorrect_answers].map(answer => (
//       {value:he.decode(answer),id: nanoid(),isHeld: false, isCorrect: false}
//     ))
//     let correct_answer = {value:he.decode(obj.correct_answer),id: nanoid(), isHeld: false, isCorrect: true}
//     let arr = [...incorrect_answers,correct_answer]
//     //shuffle the array 
//     let shuffled = arr.sort((a, b) => 0.5 - Math.random())

//     // if the question type is a boolean,use the length to sort so that 'True' will always be the first answer option
//     // else just return the shuffled array
//     shuffled = obj.type === "boolean" ? shuffled.sort((a,b) => a.value.length - b.value.length) : shuffled

//     //add the shuffled array into the object
//     return {...obj,correct_answer:correct_answer,question:he.decode(obj.question),shuffled:shuffled,id: nanoid()}
//   })
//   setData(val)

// })
// .catch(err => console.log(err.message))
// .finally(() => setTimeout(() => {
//   setIsLoading(false)
// },1000))

// },[formData])


//     return ( 
//        {data,isLoading}
//      );
// }
 
// export default UseFetch;
