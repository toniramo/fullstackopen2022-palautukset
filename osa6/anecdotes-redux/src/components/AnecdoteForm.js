import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault();
  
    const content = event.target.anecdote.value;
    event.target.anecdote.value = ''
    dispatch(createNew(content))
    dispatch(setNotification(`You created '${content}'.`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} style={{marginBottom:'20px'}}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm;