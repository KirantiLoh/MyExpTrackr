import Image from "next/image"
import { useState, useContext, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import loginStyles from '../../styles/Login.module.css'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import LoginImg from '../../public/login-img.jpg'
import Logo from '../../public/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import { withPublic } from "../../hoc/route"

const RegisterPage = () => {
 
    const {registerUser, loginUserGoogle, setErrorMessage, errorMessage} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const password1Ref = useRef()
    const password2Ref = useRef()

    const handleSubmit = (e) => {
      e.preventDefault()
      setErrorMessage('')
      password1Ref.current.style.borderColor = 'var(--primary-color)'
      password2Ref.current.style.borderColor = 'var(--primary-color)'
      
      if (password1 !== password2) {
        setErrorMessage("Password does't match")
        password1Ref.current.style.borderColor = 'var(--error-color)'
        password2Ref.current.style.borderColor = 'var(--error-color)'
        return
      } 
      if (password1.length <= 6) {
        setErrorMessage("Password must be longer than 6 characters")
        password1Ref.current.style.borderColor = 'var(--error-color)'
        password2Ref.current.style.borderColor = 'var(--error-color)'
        return
      }
      registerUser(e, email, name, password1)
    }


  return (
    <div className={loginStyles.loginPage}>
            <div className={loginStyles.loginImageContainer}>
                <Image src={LoginImg} alt={'Login Image'} layout={'fill'} objectFit={'cover'} priority/>
                <h1 className="logo">
                    <Image src={Logo} alt={'logo'} width={100} height={100}/>
                    <p>My ExpTrackr</p>
                </h1>
            </div>
            <form className={loginStyles.registerForm} onSubmit={e => handleSubmit(e, email, name, password1, password2)}>
            <h1 className={loginStyles.title}>Register</h1>
            <div>
                    <p><input style={{borderColor:  errorMessage ? "var(--error-color)" : "var(--primary-color)"}} type="email" name='email' value={email} id='id_email' placeholder='Email' onChange={e => setEmail(e.target.value)}/></p>
                    <p><input style={{borderColor:  errorMessage ? "var(--error-color)" : "var(--primary-color)"}} type="text" name='name' value={name} id='id_username' placeholder='Username' onChange={e => setName(e.target.value)}/></p>
                    <p><input style={{borderColor:  errorMessage ? "var(--error-color)" : "var(--primary-color)"}} type="password" name="password1" ref={password1Ref} value={password1} id="id_password1" placeholder='Password' onChange={e => setPassword1(e.target.value)}/></p>
                    <p><input style={{borderColor:  errorMessage ? "var(--error-color)" : "var(--primary-color)"}} type="password" name="password2" ref={password2Ref} value={password2} id="id_password2" placeholder='Confirm Password' onChange={e => setPassword2(e.target.value)}/></p>
                    <p className={loginStyles.errorMessage}>{errorMessage}</p>
                    <button type="submit" className={loginStyles.loginBtn} disabled={!email || !name || !password1 || !password2}>Register</button>
            </div>
            <p id="or">Or</p>
                <button type="button" className={loginStyles.googleBtn} onClick={e => loginUserGoogle(e)}><FontAwesomeIcon icon={faGoogle}/> Google</button>
                <p>Have an account? Login <Link href={'/account/login'}><a>here</a></Link></p>

            </form>

    </div>
  )
}

export default withPublic(RegisterPage)