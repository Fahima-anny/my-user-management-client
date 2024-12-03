import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null) ;

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {


    const auth = getAuth(app);
    const [currUser, setCurrUser] = useState(null) ;
const [name, setName] = useState(null) ;

    // create new User 
const createUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass)
}

// update user 
const updateInfo = (updatedInfo) => {
   return updateProfile(auth.currentUser, updatedInfo)
}

// log out user 
const logout = () => {
    return signOut(auth)
}


useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
        setCurrUser(currentUser) ;
        setName(currentUser.displayName)
        // console.log("current user: ", currentUser)
    })
    return () => unSubscribe() ;
} , [auth])


const authInfo = {
createUser,
currUser,
setCurrUser,
updateInfo,
logout,
name,
setName
}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
