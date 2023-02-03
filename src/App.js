import React,{useEffect,useState} from 'react'
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
    

    // const asyncData = async () => {
    //   const data = await fetch("https://ng-project-2aa46-default-rtdb.firebaseio.com/getMaster.json")
    //   const parsedData = await data.json()
    //   console.log(parsedData) 
    //   setMasterPasswrod(parsedData.password)
     
    // }
    // asyncData()
    // fetch("https://ng-project-2aa46-default-rtdb.firebaseio.com/getMaster.json").then((data) => data.json()).then((final) => {
    //   setMasterPasswrod(final.password)
    //   console.log(final.password)
    
    


  },[])

//   useEffect(() => {
//     const handleType = (event) => {
//       if (gameOver) {
//         return
//       }
//           if (currentGuess.length > 5) {
//   setCurrentGuess(currentGuess.slice(0,5))
//           }
      
      
      
//       if (event.key === "Enter") {
//         if (currentGuess.length !== 5) {
//           return;
//         }

// const newGuesses=[... guesses];
// newGuesses[guesses.findIndex(val=>val == null)]=currentGuess;
//         setGuesses(newGuesses);
     
//     setCurrentGuess('');

//                if (currentGuess===solution) {
//                  setGameOver(true)
//                  setTimeout(() => {
//     window.location.reload(false);
                   
//                    alert("Congratulationsss brother....")
//                  },1000)
//         }
                                          

//         if (currentGuess.length >= 5) {
//           return;
//         }
      
 
    

       
//       }
//        if (event.key == 'Backspace') {
//           setCurrentGuess(currentGuess.slice(0, -1))
//           return;
//         }
  
//      setCurrentGuess(oldGuess=>oldGuess+event.key)
//     }  
    
//     window.addEventListener('keydown', handleType);
//     return ()=> window.removeEventListener('keydown',handleType)


// },[currentGuess,gameOver,solution])

  
  

  useEffect(() => {

    const asyncData = async () => {
      const data = await fetch("https://ng-project-2aa46-default-rtdb.firebaseio.com/getMaster.json")
      const parsedData = await data.json()
      console.log(parsedData) 
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
      alert("Katam Gaya!...tata bye bye ")
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
                   
                   alert("Congratulationsss brother....")
                 },1000)
    }
  }
  

    console.log(masterPasswrod)
    const masterUser = (e) => {
      const password = e.target.value
      console.log(password)
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
       if (password === "529160") {
        setIsChangePass(true)
    
       }
       else {
         setIsChangePass(false)
    }
  }
  const changPassword = (e) => {
    e.preventDefault()
  fetch('https://ng-project-2aa46-default-rtdb.firebaseio.com/getMaster.json', {
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
