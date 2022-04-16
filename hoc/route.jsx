import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { useRouter } from 'next/router'
import LoadingScreen from "../components/LoadingScreen"

export const withPublic = (Component) => {
    return function WithPublic(props) {
        const { currentUser } = useContext(AuthContext)

        const router = useRouter()

        if (currentUser) {
            router.replace('/')
            return <LoadingScreen/>
        }
        return <Component {...props}/>
    }
}

export const withProtected =(Component) => {
    return function WithProtected(props) {
        const {currentUser} = useContext(AuthContext)

        const router = useRouter()

        if (currentUser) {
            return <Component {...props}/>
        }
        router.replace('/account/login')
        return <LoadingScreen/>
    }
}

