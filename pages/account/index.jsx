import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


const AccountPage = () => {
    const { logoutUser } = useContext(AuthContext)

  return (
    <div>
        <Header/>
        <button className='primary-btn' onClick={() => logoutUser()}><FontAwesomeIcon icon={faSignOut}/> Logout</button>
    </div>
  )
}

export default AccountPage