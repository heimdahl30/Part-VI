import { useDispatch } from 'react-redux'
import filterReducer, { filtration } from '../reducers/filterReducer'

const Filter = () => {
 
const dispatch = useDispatch()

const handleChange = (event) => {
  dispatch({type: 'filtering/filtration', payload: event.target.value})
  }

const style = {
  marginBottom: 10
  }

return (
  <div style={style}>
     filter <input onChange={handleChange} />
  </div>
  )
}

export default Filter