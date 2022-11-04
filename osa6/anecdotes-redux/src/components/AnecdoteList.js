import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter.toLowerCase())
  const dispatch = useDispatch()

  const voteAnecdote = ({ id, content }) => {
    dispatch(vote(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <>
      {console.log(anecdotes)}
      {anecdotes
      //.sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      .map(anecdote =>
        <div key={anecdote.id} style={{marginBottom:10}}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList