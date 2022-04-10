import { createContext, useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail, signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { app, db } from '../firebase/firebaseApp'
import { useRouter } from "next/router";
import LoadingScreen from "../components/LoadingScreen";
import { doc, setDoc, getDoc, collection, serverTimestamp } from "firebase/firestore";


const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userDoc, setUserDoc] = useState(null)
    const auth = getAuth(app)

    const router = useRouter()

    const createUserDoc = async (user, name) => {
        if (!user) return

        const userRef = doc(db, 'users', user.uid)
        
        const snapshot = await getDoc(userRef)
        
        if (!snapshot.exists()) {
            const { uid, email, displayName, photoURL, providerData } = user
            try {
                await setDoc(userRef, {
                    email: email,
                    name: displayName ? displayName : name,
                    avatar: photoURL,
                    provider: providerData[0].providerId,
                    uid: uid,
                    balance: 0,
                    total_expense: 0,
                    total_income: 0,
                    last5Expenses: [],
                    last5Income: [],
                    createdAt: new Date()
                })
            } catch (err) {
                console.error(err)
            }
        }
    
    }

    const resetPassword = async (e, email) => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email)
            router.push('/password-reset/success')
        } catch (err) {
            console.error(err)
        }
    }

    const loginUserGoogle = async (e) => {
        e.preventDefault()
        try {
            let userCredentials = await signInWithPopup(auth, new GoogleAuthProvider())
            setCurrentUser(userCredentials.user)
            await createUserDoc(userCredentials.user)
            router.push('/')
        } catch (err) {
            console.error(err.message)
        }
    }

    const loginUser = async (e, email, password) => {
        e.preventDefault()
        try {
            let userCredentials = await signInWithEmailAndPassword(auth, email, password)
            setCurrentUser(userCredentials.user)
            await createUserDoc(userCredentials.user, name)
            router.push('/')
        } catch (err) {
            console.error(err.message)
        }
    }

    const logoutUser = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err.message)
        }
    }

    const registerUser = async (e, email, name, password1, password2) => {
        e.preventDefault()
        try {
            let userCredentials = await createUserWithEmailAndPassword(auth, email, password1)
            setCurrentUser(userCredentials.user)
            await updateProfile(userCredentials.user, {
                displayName: name
            })
            await createUserDoc(userCredentials.user)
            router.push('/')
        } catch (err) {
            console.error(err.message)
        }
        
    }


    const contextValue = {
        currentUser:currentUser,
        loading:loading,
        loginUser:loginUser,
        loginUserGoogle:loginUserGoogle,
        logoutUser:logoutUser,
        resetPassword: resetPassword,
        registerUser:registerUser,
        setLoading:setLoading,
        userDoc:userDoc,
        setUserDoc:setUserDoc
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setLoading(true)
            if (!user) {
                setCurrentUser(null)
                router.push('/account/login') 
            } else {
                setCurrentUser(user)
                router.push('/')

            }
            setLoading(false)
        })
    }, [])

    return <AuthContext.Provider value={contextValue}>
        {loading ? <LoadingScreen/> : children}
    </AuthContext.Provider>
}

export {AuthContext, AuthProvider}