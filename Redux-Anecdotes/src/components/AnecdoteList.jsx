import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnec } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const votedAnecdote = anecdotes.filter((anecdote) => anecdote.id === id)
    const updatedAnecdote = {
      content: votedAnecdote[0].content,
      id: votedAnecdote[0].id,
      votes: votedAnecdote[0].votes + 1
    }
    dispatch(voteAnec(id, updatedAnecdote))
    dispatch(setNotification(`you voted '${votedAnecdote[0].content}'`, 10))
  }

  if (filterValue){
    return (
      <div>
        {anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filterValue.toLowerCase())).sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
  }

  return (    
    <div>
      {[...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>  
  )
}

export default AnecdoteList
