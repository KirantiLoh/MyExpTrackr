import { withPublic } from "../../../hoc/route"
import Image from 'next/image'
import LoginImg from '../../../public/login-img.jpg'
import loginStyles from '../../../styles/Login.module.css'
import Logo from '../../../public/logo.png'
import Link from "next/link"

const SuccessPage = () => {
  return (
    <div className={loginStyles.loginPage}>
    <div className={loginStyles.loginImageContainer}>
        <Image src={LoginImg} alt={'Login Image'} layout={'fill'} objectFit={'cover'} priority/>
        <h1 className="logo">
            <Image src={Logo} alt={'logo'} width={100} height={100}/>
            <p>My ExpTrackr</p>
        </h1>
    </div>
    <div className={loginStyles.right}>
    <div className={loginStyles.successContainer}>
    <h1 className={loginStyles.title}>Password Reset</h1>
    <h3>We have sent the link to reset your password to your mail, if you don&apos;t see it, please check your spam folder</h3>
    <Link  href={"/"}>
      <a className="primary-btn">
        Back to Home Page
      </a>
    </Link>
    </div>
    </div>
</div>
  )
}

export default withPublic(SuccessPage)