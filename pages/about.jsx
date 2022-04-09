import { useContext, useEffect } from 'react'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'

const AboutPage = () => {

  const {setLoading} = useContext(AuthContext)

  useEffect(() => {
    return () => {

    }
  }, [])
  return (
    <div>
        <Header/>
        AboutPage
    </div>
  )
}

export default AboutPage