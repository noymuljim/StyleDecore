import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';
const GoogleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)




    //register user
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //signin/login
    const signinUser = (email, password) => {
        setLoading(true)

        return signInWithEmailAndPassword(auth, email, password)
    }
    //login Google
    const signIngoogle = () => {
        setLoading(true)

        return signInWithPopup(auth, GoogleProvider)
    }
    //update
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    //signout
    const logout = () => {
        setLoading(true)
        return signOut(auth);
    }
    //forget pass 
    const forgetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    //state check
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)


        })
        return () => {
            unsuscribe()
        }
    }, [])



    const authInfo = {
        user, setUser, loading, logout, setLoading, signinUser, registerUser, updateUserProfile, signIngoogle, forgetPass
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;