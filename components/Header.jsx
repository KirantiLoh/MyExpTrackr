import Link from 'next/link'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import Image from 'next/image'
import Logo from '../public/logo.png'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <nav>
        <h1 className="logo">
          <Link href={'/'}>
            <a>
              <Image src={Logo} alt={'logo'} width={75} height={75}/>
              My ExpTrackr
            </a>
          </Link>
        </h1>
        <ul>
          <li>
          <Link href={'/account'}>
            <a className='settings'>
              <FontAwesomeIcon icon={faCog}/>
              <span>Settings</span>
            </a>
          </Link>
          </li>
          <li>
            <label htmlFor="chk" className="showSideNav">
              <FontAwesomeIcon icon={faTimes}/>
            </label>
          </li>
        </ul>

      </nav>
  )
}

export default Header

/*
import { faAddressCard, faSignOut } from '@fortawesome/free-solid-svg-icons'




*/