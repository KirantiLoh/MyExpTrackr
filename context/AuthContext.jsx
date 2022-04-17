import { createContext, useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail, signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { app, db } from '../firebase/firebaseApp'
import { useRouter } from "next/router";
import LoadingScreen from "../components/LoadingScreen";
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from "firebase/firestore";


const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userDoc, setUserDoc] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
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
                    createdAt: serverTimestamp()
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
            router.replace('/account/password-reset/success')
        } catch (err) {
            setErrorMessage('No user was found with this email')
        }
    }

    const loginUserGoogle = async (e) => {
        e.preventDefault()
        try {
            setErrorMessage('')
            let userCredentials = await signInWithPopup(auth, new GoogleAuthProvider())
            setCurrentUser(userCredentials.user)
            await createUserDoc(userCredentials.user)
            router.replace('/')
        } catch (err) {
            console.error(err.message)
        }
    }

    const loginUser = async (e, email, password) => {
        e.preventDefault()
        try {
            setErrorMessage('')
            let userCredentials = await signInWithEmailAndPassword(auth, email, password)
            setCurrentUser(userCredentials.user)
            await createUserDoc(userCredentials.user, name)
            router.replace('/')
        } catch (err) {
            if (err.message === "Firebase: Error (auth/wrong-password).") {
                setErrorMessage('Wrong Password')
            }
            else if (err.message === "Firebase: Error (auth/user-not-found).") {
                setErrorMessage("User was not found")
            }
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
            setErrorMessage('')
            let userCredentials = await createUserWithEmailAndPassword(auth, email, password1)
            setCurrentUser(userCredentials.user)
            await updateProfile(userCredentials.user, {
                displayName: name
            })
            await createUserDoc(userCredentials.user)
            router.replace('/')
        } catch (err) {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                setErrorMessage("The email is taken")
            }
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
        setUserDoc:setUserDoc,
        errorMessage: errorMessage,
        setErrorMessage: setErrorMessage
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setLoading(true)
            setErrorMessage('')
            if (!user) {
                setCurrentUser(null)
                router.replace('/account/login') 
            } else {
                setCurrentUser(user)
                router.replace('/')

            }
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid)
            
            const unsubscribe = onSnapshot(userRef, (doc) => {
                setUserDoc(doc.data())
            })
            return () => unsubscribe()
        }
      }, [currentUser])

    return <AuthContext.Provider value={contextValue}>
        {loading ? <LoadingScreen/> : children}
    </AuthContext.Provider>
}

export {AuthContext, AuthProvider}