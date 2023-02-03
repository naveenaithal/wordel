import React,{useEffect,useState} from 'react'
import { CHANGE_MASTER_PASSWORD, GET_URL, POST_URL } from './credential';
import './App.css';
import {wordsArray} from './data'
import './index.css'







function App() {
const [solution,setSolution]=useState('')
  const [guesses, setGuesses] = useState(Array(5).fill(null))
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false)
  const [isMaster, setIsMaster] = useState(false)
  const [changeMasterPassword, setChangeMasterPassword] = useState('')
  const [isChangePass, setIsChangePass] = useState(false)
  const [masterPasswrod, setMasterPasswrod] = useState('')
  



 

  useEffect(() => {

    const asyncData = async () => {
      const data = await fetch(GET_URL)
      const parsedData = await data.json()
      setMasterPasswrod(parsedData.password)
     
    }
    asyncData()


    const fetchWords = async () => {
      let randWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
     await setSolution(randWord)
    }
  fetchWords()
  },[])
  
  if (guesses.every(val => val !== null) && !gameOver) {
    setTimeout(() => {
      alert("Game over. try again!")
      window.location.reload(false);
  
},500)}
  
  const handleChnage = (e) => {
    
    let text = e.target.value
    if (text.length === 5) {
       const newGuesses=[...guesses];
newGuesses[guesses.findIndex(val=>val == null)]=text;
      setGuesses(newGuesses);
      e.target.value=''
    }
    if (solution === text) {
     setGameOver(true)
                 setTimeout(() => {
    window.location.reload(false);
                   
                   alert("Congratulations You Guessed right Word.....")
                 },1000)
    }
  }
  


    const masterUser = (e) => {
      const password = e.target.value
    if (password.length === 6) {
      if (password === masterPasswrod) {
        setIsMaster(true)
      }
    
      }
    else {
      // alert('no access')
        setIsMaster(false)
        setIsChangePass(true)

    }
       if (password === CHANGE_MASTER_PASSWORD) {
        setIsChangePass(true)
    
       }
       else {
         setIsChangePass(false)
    }
  }
  const changPassword = (e) => {
    e.preventDefault()
  fetch(POST_URL, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    password: `${changeMasterPassword}`,
  })
});
    setMasterPasswrod(changeMasterPassword)
    alert("Master Password Changed!")
    window.location.reload(false);

  }

  return (
    <div className="container">
      <h2>Wordel!</h2>
      {
        guesses.map((guess, index) => {
          const isCurrentGuess=index === guesses.findIndex(val=>val==null)
          return <Link key={index} guess={isCurrentGuess ? currentGuess : guess ?? ''}
           isFinal={!isCurrentGuess && guess !==null}  solution={solution} />
        })
        
      }
      <input placeholder='type here' type='text' onChange={handleChnage} />
      -------------------------------------------------
      <input placeholder='master Password' type='text' onChange={masterUser} />


{
   isChangePass&&   <form onSubmit={(e)=>changPassword(e)}>
           <input placeholder='master Password' type='text' onChange={(e)=>setChangeMasterPassword(e.target.value)} />
 <button >Change</button >
</form>}


      {
        isMaster && solution
      }
    </div>
  );
}



const Link = ({ guess,isFinal,solution }) => {
const WORD_LENGTH=5

  const tiles = []
  for (let i = 0; i < WORD_LENGTH; i++){
    const char = guess[i]

    let customClass = 'tile'
    

    if (isFinal) {
      if (char === solution[i]) {
    customClass+=' correct'
      }
      else if (solution.includes(char)) {
        customClass+='  close'
      }
      else {
        customClass+=' wrong'
      }
    }
  
    tiles.push(<div key={i}
      className={customClass}> {char}
    </div>
    )
  }

  return (
    <div className='line'>
      {tiles}
  </div>
)
  
}


export default App;
