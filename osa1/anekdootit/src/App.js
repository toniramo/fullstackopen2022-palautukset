import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Header = ({ text }) => {
  return(
    <>
      <h1>{text}</h1>
    </>
  )
}

const DisplayAnecdote = ({ index, anecdotes, points }) => {
  return(
    <div>
      {anecdotes[index]}
      <div>has {points[index]} votes</div>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const chooseNewRandomNumber = (maxValue, currentValue) => {
    let random = currentValue
    while (random === currentValue) {
      random = Math.floor(Math.random() * maxValue)
    }
    return random
  }
   
  const [selected, setSelected] = useState(chooseNewRandomNumber(anecdotes.length, -1))
  const [points, updatePoints] = useState(Array(anecdotes.length).fill(0));
  const [mostVoted, updateMostVoted] = useState(selected)

  const nextRandomAnecdote = () => {
    setSelected(chooseNewRandomNumber(anecdotes.length, selected))
  }

  const incrementPointsOfSelected = () => {
    const  copy = [...points]
    copy[selected] += 1
    updatePoints(copy)
  }

  const updateMostVotedIfNeeded = () => {
      if (points[selected] >= points[mostVoted]) {
        updateMostVoted(selected)
    }
  }

  const handleVote = () => {
    incrementPointsOfSelected()
    updateMostVotedIfNeeded()
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <DisplayAnecdote index={selected} points={points} anecdotes={anecdotes}/>
      <Button handleClick={handleVote} text="vote"/>
      <Button handleClick={nextRandomAnecdote} text="next anecdote"/>

      <Header text="Anecdote with most votes"/>
      <DisplayAnecdote index={mostVoted} points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
