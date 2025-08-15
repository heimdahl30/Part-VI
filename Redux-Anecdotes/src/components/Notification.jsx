import { useSelector } from 'react-redux'

const Notification = () => {
  const notify = useSelector(state => state.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  }
  return (
    <div style={style}>
      {notify}
    </div>
  )
}

export default Notification