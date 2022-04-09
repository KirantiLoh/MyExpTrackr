import {useState} from 'react'
import ReactDOM from 'react-dom'

const Modal = ({message, type}) => {
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
      <div className="notification"></div>,
      document.getElementById('modal-root')
  )} else {
      return null
  }
}

export default Modal