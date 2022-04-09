import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useContext,useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import LoginImg from '../../../public/login-img.jpg'
import loginStyles from '../../../styles/Login.module.css'
import Logo from '../../../public/logo.png'
import LoadingScreen from '../../../components/LoadingScreen'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from "next/router";

const ResetPasswordPage = () => {

    const { resetPassword } = useContext(AuthContext)

    const [email, setEmail] = useState('')

    const router = useRouter()

  return (
    <div className={loginStyles.loginPage}>
            <div className={loginStyles.loginImageContainer}>
                <Image src={LoginImg} alt={'Login Image'} layout={'fill'} objectFit={'cover'} priority/>
                <h1 className="logo">
                    <Image src={Logo} alt={'logo'} width={100} height={100}/>
                    <p>My ExpTrackr</p>
                </h1>
            </div>
            <form className={loginStyles.loginForm} onSubmit={e => resetPassword(e, email)}>
            <h1 className={loginStyles.title}>Password Reset</h1>
            <div>
                    <p><input type="email" name='email' id='id_email' placeholder='Email' onChange={e => setEmail(e.target.value)}/></p>
                    <button type="submit" className={loginStyles.loginBtn}>Send</button>
            </div>
            <p>Have an account? Login <Link href={'/account/login'}><a>here</a></Link></p>
            </form>
    </div>
  )
}

export default ResetPasswordPage