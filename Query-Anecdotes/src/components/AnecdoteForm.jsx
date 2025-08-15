import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import MessageContext from '../MessageContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const [message, messageDispatch] = useContext(MessageContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
   onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
    messageDispatch({type: 'Set_Message', payload: 'Anecdote is too short; must be 5 characters long'})
          setTimeout(() => {
      messageDispatch({type:'Set_Message', payload: null})
    },5000)
  }

  else {
    newAnecdoteMutation.mutate({content, votes:0})
    messageDispatch({type: 'Set_Message', payload: `${content} has been created`})
    setTimeout(() => {
      messageDispatch({type:'Set_Message', payload: null})
    },5000)
    console.log('new anecdote')
}
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
