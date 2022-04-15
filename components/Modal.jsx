import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Modal = ({message, type, show}) => {

  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
    <div className="notification" style={{left: show ? '0' : '-150%'}}>
        <p>{message}</p>
        <span>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </span>
      </div>,
      document.getElementById('modal-root')
  )}
}

export default Modal
