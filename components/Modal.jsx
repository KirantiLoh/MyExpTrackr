import ReactDOM from 'react-dom'

const Modal = ({message, type, show}) => {
  
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
    <div className="notification" style={{left: show ? '0' : '-150%'}}>
        <p>{message}</p>
      </div>,
      document.getElementById('modal-root')
  )}
}

export default Modal

/*
*/