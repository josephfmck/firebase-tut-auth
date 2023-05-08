import React, { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase";
//*Context Function

//*actual context to export for entire application
const AuthContext = React.createContext();

//*1 Executes AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

//*Provides context 
export function AuthProvider({ children }) {
  //!STATE
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //*Get current user through ASYNC form submission
    //?returns promise
  function signup(email, password) {
    //!Firebase auth method
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  useEffect(() => {
    //*!firebase auth method - did verification to set user
    //sets state during component lifecycle 
                //?current user starts out as null and then is set
                //?when user already signed in it connects user 
      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        //sets state to obj or null 
        setCurrentUser(user);
        //done if checking if user is already signed in
        setLoading(false);
      })

      //*executes when component unmounted
      //*resets/removes state
      return unsubscribe
     }, [])

  //*State
  const authenticationState = {
    currentUser,
    signup
  };

  //!RENDER
    //? Provider is rendering out the children were 
    //? context is returning the authenticationState 
        //*returning currentUser to use anywhere in App
          //?if not loading then render out
          //?NOT rendering until setCurrentUser is exec for first time
  return (
      <AuthContext.Provider value={authenticationState}>
      {!loading && children}
      </AuthContext.Provider>
  );
}


//!--> Signup.js