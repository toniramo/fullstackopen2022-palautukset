import { useDispatch } from "react-redux"
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }
  
  return ( 
    <div style={style}>
      <label>
        filter: 
        <input onChange={handleChange}/>
      </label>
    </div>
  )
}

export default Filter