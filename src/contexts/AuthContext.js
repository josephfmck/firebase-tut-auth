import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

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

  //*Get current user through ASYNC form submission
    //?returns promise
  function signup(email, password) {
    //!Firebase auth method
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    //*!firebase auth method - 
    //sets state during component lifecycle 
      const unsubscribe = auth.onAuthStateChanged((user) => {
        //sets state to obj or null 
        setCurrentUser(user);
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
  return (
    <div>
      <AuthContext.Provider authStateProp={authenticationState} />
      {children}
      <AuthContext.Provider />
    </div>
  );
}


//!--> Signup.js