import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes' 

const initialState = []

const anecdoteSlice = createSlice({
  name: 'dotes',
  initialState,
  reducers: {
    newAnecdote (state, action) {
      const content = action.payload
      return state.concat(action.payload)
    },

    voteAnecdote (state, action){
      return state.map((item) => item.id === action.payload.id ? action.payload : item)
    },

    setAnecdotes (state, action) {
      state = action.payload
      return state
    }

  }
})

export const { newAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnec = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnec(content)
    dispatch(newAnecdote(anecdote))

  }
}

export const voteAnec = (id, anecdote) => {
  return async dispatch => {
    const votedAnec = await anecdoteService.update(id, anecdote)
    dispatch(voteAnecdote(votedAnec))

  }
}
 
export default anecdoteSlice.reducer