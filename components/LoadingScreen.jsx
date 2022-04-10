import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign } from "@fortawesome/free-solid-svg-icons"
import Head from "next/head"
import Image from 'next/image'
import Logo from '../public/logo.png'

const LoadingScreen = ({message}) => {
    return (
        <div className='loading-page'>
            <Head>
                <title>My ExpTrackr</title>
                <meta name="description" content="My Expense Tracker is a website where people can track their expenses, created using Next JS and Firebase" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
          <div className="inner-content">
          <h1 className="logo">
                <Image src={Logo} alt={'logo'} width={100} height={100}/>
                My ExpTrackr
          </h1>
            <h1 className="loading-logo"><FontAwesomeIcon icon={faDollarSign}/></h1>
            <h1 className='title'>Loading...</h1>
            <p>{message}</p>
          </div>
        </div>
      )
}

export default LoadingScreen