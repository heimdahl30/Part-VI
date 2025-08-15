import { useDispatch } from 'react-redux'
import { newAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnec(anecdote))
    dispatch(setNotification(`${anecdote} is created`, 10))
    }

    return (

    <div>
     <h2>create new</h2>
      <form onSubmit = {createAnecdote}>
        <div><input name ="anecdote"/></div>
        <button type = "submit">create</button>
      </form>
    </div>

    )
}

export default AnecdoteForm

     

    

