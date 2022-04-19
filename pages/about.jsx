/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/About.module.css'
import BgImg from '../public/login-img.jpg'
import Decor1 from '../public/decoration1.png'
import NextJSLogo from '../public/next-js.png'
import Image from 'next/image'
import FirebaseLogo from '../public/firebase.png'
import emailjs from '@emailjs/browser'
import Modal from '../components/Modal'

const AboutPage = () => {

  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const formRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, formRef.current)
    .then(result => {
      setMessage('Message successfully sent!')
    }).catch(error => {
      setMessage("There's an error when sending email...")
    })
  }

  return (
    <div className={styles.container}>
          <div className={styles.left}>
            <input type="checkbox" id="chk" />
            <label htmlFor="chk" className={"showSideNav"}>
              <FontAwesomeIcon icon={faBars}/>
            </label>
            <Header/>
            <h1>About</h1>
          </div>
    <div className={styles.aboutPageContainer}>
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
          <p>My ExpTrackr is a service where everybody can track their expenses and incomes without any hassle. My ExpTrackr is created by Maurice Yang using Next.JS and Firebase. The development took approximately 1 month, and currently it&apos;s still updating as there&apos;s alot of feature yet to be added.</p>
          <img src={Decor1.src} alt='decor 1' className={styles.decor1}/>
        </div>
        <div className={styles.techUsedContainer}>
          <h1 className={styles.title}>Technologies Used</h1>
          <ul className={styles.techUsedList}>
            <li>
              <Image src={NextJSLogo} alt="Next JS Logo" objectFit='cover' width={300} height={300}/>
              <h3>Next JS</h3>
            </li>
            <li>
              <Image src={FirebaseLogo} alt="Firebase Logo" objectFit='cover' width={300} height={300}/>
              <h3>Firebase</h3>
            </li>
          </ul>
        </div>
        <div className={styles.creatorContainer}>
          <h1 className={styles.title}>Creator of My ExpTrackr</h1>
        </div>
        <div className={styles.contactContainer}>
          <form ref={formRef}>
            <h1 className={styles.title}>Contact Me</h1>
            <input type="text" placeholder='Name' name="user_name" />
            <input type="email" placeholder='Email' name="user_email" />
            <textarea name="message" />
            <button type="submit" value="Send">Send</button>
          </form>
        <small>&copy; Copyright 2018, Example Corporation</small>
        </div>
    </div>
    <Modal/>
    </div>

  )
}

export default AboutPage