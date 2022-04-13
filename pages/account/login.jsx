import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useContext,useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import LoginImg from '../../public/login-img.jpg'
import loginStyles from '../../styles/Login.module.css'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Logo from '../../public/logo.png'
import { withPublic } from '../../hoc/route'


const LoginPage = () => {

    const { errorMessage, loginUser, loginUserGoogle, setErrorMessage} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
      setErrorMessage('')
    }, [])

  return (
    <div className={loginStyles.loginPage}>
            <div className={loginStyles.loginImageContainer}>
                <Image src={LoginImg} alt={'Login Image'} layout={'fill'} objectFit={'cover'} priority/>
                <h1 className="logo">
                    <Image src={Logo} alt={'logo'} width={100} height={100}/>
                    <p>My ExpTrackr</p>
                </h1>
            </div>
            <form className={loginStyles.loginForm} onSubmit={e => loginUser(e, email, password)}>
            <h1 className={loginStyles.title}>Login</h1>
            <div>
                    <p><input type="email" name='email' id='id_email' placeholder='Email' onChange={e => setEmail(e.target.value)}/></p>
                    <p><input type="password" style={{borderColor:  errorMessage ? "var(--error-color)" : "var(--primary-color)"}} name="password" id="id_password" placeholder='Password' onChange={e => setPassword(e.target.value)}/></p>
                    <p className={loginStyles.errorMessage}>{errorMessage}</p>
                    <button type="submit" className={loginStyles.loginBtn} disabled={!email || !password}>Login</button>
            </div>
            <p id="or">Or</p>
            <button type="button" className={loginStyles.googleBtn} onClick={e => loginUserGoogle(e)}><FontAwesomeIcon icon={faGoogle}/> Google</button>
            <p>Don&apos;t have an account? Register <Link href={'/account/register'}><a>here</a></Link></p>
            <p><Link href={'/account/password-reset'}><a>Forgot password</a></Link></p>
            </form>
    </div>
  )
}

export default withPublic(LoginPage)