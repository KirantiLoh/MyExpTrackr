import Link from 'next/link'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faHome, faMoneyBill, faWallet } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Logo from '../public/logo.png'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
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
            <Link href={'/'}>
              <a>
                <FontAwesomeIcon icon={faHome}/>
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={'/expenses'}>
              <a>
                <FontAwesomeIcon icon={faMoneyBill}/>
                <span>Expenses</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/incomes"}>
              <a>
                <FontAwesomeIcon icon={faWallet}/>
                <span>Incomes</span>
              </a>
            </Link>
          </li>
          <li>
          <Link href={'/account'}>
            <a className='settings'>
              <FontAwesomeIcon icon={faCog}/>
              <span>Settings</span>
            </a>
          </Link>
          </li>
        </ul>
        <label htmlFor="chk" className="hideSideNav">
              <FontAwesomeIcon icon={faTimes}/>
        </label>
      </nav>
  )
}

export default Header

/*
import { faAddressCard, faSignOut } from '@fortawesome/free-solid-svg-icons'




*/