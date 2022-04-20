import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/Settings.module.css'
import Avatar from '../../components/Avatar'
import { withProtected } from '../../hoc/route'
import { updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseApp'
import Modal from '../../components/Modal'

const AccountPage = () => {
    const { logoutUser, userDoc, currentUser } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!name) return;
      await updateProfile(currentUser, {displayName: name})
      await updateDoc(doc(db, 'users', currentUser.uid), {
        name: name
      })
      setName('')
      setShowModal(true)
    }

    useEffect(() => {
      let handler = setTimeout(() => {
        setShowModal(false)
      }, 2000);
      return () => {
        clearTimeout(handler)
      }
    }, [showModal])

  return (
    <div>
      <div className={styles.upper}>
        <input required type="checkbox" id="chk" />
        <Header/>    
        <label htmlFor="chk" className="showSideNav">
          <FontAwesomeIcon icon={faBars}/>
        </label>  
        <h1>Account Settings</h1>
      </div>
      <form className={styles.editProfileForm} onSubmit={e => handleSubmit(e)}>
            <h1 className={styles.title}>Edit Profile</h1>
            <Avatar profilePic={userDoc?.avatar} displayName={userDoc?.name} email={userDoc?.email} imageHeight={100} imageWidth={100}/>
            <div>
              <p><input required type="text" name='name' value={name} id='id_username' placeholder='Username' onChange={e => setName(e.target.value)}/></p>
              <button type="submit" className='primary-btn' style={{marginLeft: '0'}} disabled={!name}>Update</button>
              <button className='secondary-btn' onClick={() => logoutUser()}><FontAwesomeIcon icon={faSignOut}/> Logout</button>
            </div>
        </form>
        <Modal message={'Profile successfully updated!'} show={showModal}/>
    </div>
  )
}

export default withProtected(AccountPage)