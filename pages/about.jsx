/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from 'react'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/About.module.css'
import BgImg from '../public/login-img.jpg'
import Decor1 from '../public/decoration1.png'

const AboutPage = () => {

  const {setLoading} = useContext(AuthContext)

  useEffect(() => {
    return () => {

    }
  }, [])
  return (
    <div className={styles.aboutPageContainer}>
        <div className={styles.left}>
            <input type="checkbox" id="chk" />
            <label htmlFor="chk" className={"showSideNav"}>
              <FontAwesomeIcon icon={faBars}/>
            </label>
            <Header/>
            <h1>About</h1>
          </div>
          <div className={styles.backgroundImageContainer}>
            <img src={BgImg.src} alt='background-img' className={styles.backgroundImage} />
            <div className={styles.text}>
              <h1>My ExpTrackr</h1>
              <h3>- Track your expenses and incomes without any hassle -</h3>
              <a href='#more' className="primary-btn">Learn More</a>
            </div>
          </div>
        <div className={styles.descContainer} id='more'>
          <h1 className={styles.title}>What is My ExpTrackr?</h1>
          <p>My ExpTrackr is a service where everybody can track their expenses and incomes without any hassle. My ExpTrackr is created by Maurice Yang using Next.JS and Firebase. The development took approximately 1 month</p>
          <img src={Decor1.src} alt='decor 1' className={styles.decor1}/>
        </div>
    </div>
  )
}

export default AboutPage