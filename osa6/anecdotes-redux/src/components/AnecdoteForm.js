//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault();
  
    const content = event.target.anecdote.value;
    event.target.anecdote.value = ''
    props.createNew(content)
    props.setNotification(`You created '${content}'.`, 5)
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

const mapDispatchToProps = {
  createNew,
  setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

//export default AnecdoteForm;
export default ConnectedAnecdoteForm