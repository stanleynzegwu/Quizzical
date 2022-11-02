import { motion } from 'framer-motion'

import { About } from '../index'
import './Home.scss'

export default function Home({handleClick,formData,setFormData}){
//handle form
function handleChange(e){
    const {name, value} = e.target;

          setFormData(prev => {
              return {
                  ...prev, [name] : value
              }
          })
  }

    return (
        <motion.div
            className="home"
            whileInView={{ x: [-100,0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="home__h1">Quizzical</h1>
            <p className="home__p">Test your knowledge by answering the questions</p>
            
            <form>
                <div className="form form-amount-question">
                    <div className='form__label'>
                        <label className="custom-label"htmlFor='amountOfQuestions'>Amount of Questions</label>
                    </div>
                    <div className='form__select'>
                        <select
                            onChange={handleChange}
                            value={formData.amountOfQuestions}
                            name='amountOfQuestions'
                            id='amountOfQuestions'
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                        </select>
                    </div>
                </div>

                <div className="form form-category">
                    <div className='form__label'>
                        <label className="custom-label" htmlFor="category">Category:</label>
                    </div>
                    <div className='form__select'>
                        <select 
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            name="category"
                        >
                            <option value='any'>Any</option>
                            <option value='9'>General Knowledge</option>
                            <option value='10'>Books</option>
                            <option value='11'>Film</option>
                            <option value='12'>Music</option>
                            <option value='13'>Musicals & Theatres</option>
                            <option value='14'>Television</option>
                            <option value='15'>Video Games</option>
                            <option value='16'>Board Games</option>
                            <option value='17'>Science & Nature</option>
                            <option value='18'>Computers</option>
                            <option value='19'>Mathematics</option>
                            <option value='20'>Mythology</option>
                            <option value='21'>Sports</option>
                            <option value='22'>Geography</option>
                            <option value='23'>History</option>
                            <option value='24'>Politics</option>
                            <option value='25'>Art</option>
                            <option value='26'>Celebrities</option>
                            <option value='27'>Animals</option>
                            <option value='28'>Vehicles</option>
                            <option value='29'>Comics</option>
                            <option value='30'>Gadgets</option>
                            <option value='31'>Anime & Manga</option>
                            <option value='32'>Cartoons & Animations</option>
                        </select>
                    </div>
                </div>

                <div className="form form-difficulty">
                    <div className='form__label'>
                        <label className="custom-label" htmlFor='difficulty'>Difficulty</label>
                    </div>
                    <div className='form__select'>
                        <select
                            onChange={handleChange}
                            value={formData.difficulty}
                            name='difficulty'
                            id='difficulty'
                        >
                            <option value=''>Any</option>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </div>
                </div>
            </form>
            <button onClick={handleClick} className="home__btn btn">Start quiz</button>
            <About />
        </motion.div>
    )
}
