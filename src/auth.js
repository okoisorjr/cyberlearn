import React, {useState, useEffect, createContext} from 'react';
import { useHistory } from 'react-router';
import firebase from '../src/firebase/config'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [checking, setIsChecking] = useState(true)
    const [user, setUser] = useState([])
    const history = useHistory()
    

    const logout = () => {
        firebase.auth().signOut()
        history.push('/Login')
        window.location.reload(false)
    }

    const signout = () =>{
        firebase.auth().signOut()
        history.push('/AdminLogin')
    }

    const newError = async (error, email) => {
        await firebase.firestore().collection('errors').add({
            created_on:new Date().toString(),
            email:email,
            error:error
        })
        .then((data) => {
            console.log('error successfully logged!')
        })
        .catch(error => console.log(error))
    }

    const pushError = async (error) => {
        await firebase.firestore().collection('errors').add({
            created_on:new Date().toString(),
            uid:currentUser.uid,
            user:user.username,
            email:user.email,
            error:error
        })
        .then((data) => {
            console.log('error successfully logged!')
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => 
        {
            if(user){
            setCurrentUser(user)
            setIsChecking(false)
            console.log(user , "successfully logged in")
            }
            else{
                setIsChecking(false)
                console.log(user)
            }
        })

         return unsubscribe
    }, [])

    const db = firebase.firestore().collection('users')

    const getUser = async () => {
        await db.doc(currentUser.email).get()
        .then(doc => {
            if(doc.exists && doc != null){
                setUser(doc.data())
            }
        })
    }

    useEffect(() => {
        if(currentUser){
            getUser()
            console.log(user)
        }
    }, [currentUser])


    const getLabs = async (id) => {
        await db
        .doc(id)
        .get()
        .then((doc) => {
            return doc.data()
        })
        .catch(error => {
            pushError(error.message)
            console.log("error :" + error)
        })
    }

    const value = {
        currentUser,
        user,
        logout,
        signout,
        pushError,
        newError,
        getLabs
    }

    
    return(
        <AuthContext.Provider value={value}>
            {checking === false && children}
        </AuthContext.Provider>
    )
}