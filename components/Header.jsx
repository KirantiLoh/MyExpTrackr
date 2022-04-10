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
              <Image src={Logo} alt={'logo'} width={100} height={100}/>
              My ExpTrackr
            </a>
          </Link>
        </h1>
        <ul>
          <li>
            <label htmlFor="chk" className="showSideNav">
              <FontAwesomeIcon icon={faTimes}/>
            </label>
          </li>
        </ul>
          <Link href={'/account'}>
            <a className='settings'>
              <FontAwesomeIcon icon={faCog}/>
            </a>
          </Link>

      </nav>
  )
}

export default Header

/*
import { faAddressCard, faSignOut } from '@fortawesome/free-solid-svg-icons'




*/