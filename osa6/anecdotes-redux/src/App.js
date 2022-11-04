import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { orderByVotes } from './utils/anecdoteHelper'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Use effect!")
    anecdoteService
    .getAll()
    .then(anecdotes => orderByVotes(anecdotes))
    .then((anecdotes => {dispatch(setAnecdotes(anecdotes))}))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App