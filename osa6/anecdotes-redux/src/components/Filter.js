//import { useDispatch } from "react-redux"
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    //dispatch(setFilter(event.target.value))
    props.setFilter(event.target.value)
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

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

//export default Filter
export default ConnectedFilter