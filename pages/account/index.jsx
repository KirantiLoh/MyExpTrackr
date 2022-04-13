import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/Settings.module.css'
import Avatar from '../../components/Avatar'

const AccountPage = () => {
    const { logoutUser, userDoc } = useContext(AuthContext)

  return (
    <div>
      <div className={styles.upper}>
        <input type="checkbox" id="chk" />
        <Header/>    
        <label htmlFor="chk" className="showSideNav">
          <FontAwesomeIcon icon={faBars}/>
        </label>  
        <h1>Account Settings</h1>
      </div>
      <Avatar profilePic={userDoc.avatar} displayName={userDoc.name} email={userDoc.email}/>
      <button className='primary-btn' onClick={() => logoutUser()}><FontAwesomeIcon icon={faSignOut}/> Logout</button>
    </div>
  )
}

export default AccountPage