import { createSlice } from "@reduxjs/toolkit"
import { orderByVotes } from '../utils/anecdoteHelper'
import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      return orderByVotes(
        state.map((anecdote) => {
          return anecdote.id === action.payload
          ? {...anecdote, votes: anecdote.votes + 1}
          : anecdote
      }))
    },
    appendAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(orderByVotes(anecdotes)))
  }
}

export const { vote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer