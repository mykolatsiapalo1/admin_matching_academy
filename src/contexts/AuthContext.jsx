import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        // console.log(user.email)
        const userEmail = user.email
        // Create a query to find the document with the specified email
        const userDocRef = doc(db, 'admin', user.uid);
        await getDoc(userDocRef)
          .then((userDocSnapshot) => {
            // console.log(userDocSnapshot.exists())
            if (userDocSnapshot.exists()) {
              if (userDocSnapshot.data().isAdmin) {
                // User document exists in Firestore
                setUsers(userDocSnapshot.data());
              }
            } else {
              setCurrentUser(null)
              console.error('User document does not exist in Firestore.');
            }
          })
          .catch(error => console.log(error))
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    isLoading,
    setIsLoading,
    users
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}