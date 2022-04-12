import '../styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from '../context/AuthContext'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
    <Head>
        <title>My ExpTrackr - Track your Expenses and Incomes without any hassle</title>
        <meta name="description" content="My Expense Tracker is a website where people can track their expenses, created using Next JS and Firebase" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} /> 
  </AuthProvider>
  )
}

export default MyApp
