//import { useSelector } from "react-redux"
import { connect } from 'react-redux'

const Notification = (props) => {

  //const notification = useSelector(state =>  state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    display: props.notification.content ? '' : 'none'
  }
  return (
    <div style={style}>
      {props.notification.content}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

//export default Notification
export default ConnectedNotification