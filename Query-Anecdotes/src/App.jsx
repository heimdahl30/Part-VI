import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'
import MessageContext from './MessageContext'

const messageReducer = (state, action) => {
  switch (action.type){
    case 'Set_Message':
      state = action.payload
      return state

    default:
      return state
  }
}

const App = () => {

  const [message, messageDispatch] = useReducer (messageReducer, null)

  const queryClient = useQueryClient()

  const voteMutation = useMutation ({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
   })

  const handleVote = (anecdote) => {
   
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    messageDispatch({type:'Set_Message', payload: `you voted ${anecdote.content}`})
    setTimeout(() => {
      messageDispatch({type:'Set_Message', payload: null})
    },5000)
    
    console.log('vote', anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <div>Loading...</div>
  }

  else if (result.isError) {
    return <div>Error: anecdote service not available due to server problems</div>
  }

  const anecdotes = result.data
  console.log("original", anecdotes)

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </MessageContext.Provider>
  )
}

export default App
