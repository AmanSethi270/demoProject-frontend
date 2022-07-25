import React, { useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn : false,
    login :()=>{},
    logout: ()=>{},
    userDetails :{},
    setUserDetails :()=>{}
})

export const AuthContextProvider = (props)=>{
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const[userDetails, setUserDetails] = useState({});

    const loginHandler = (details)=>{
        setUserLoggedIn(true);
        setUserDetails(details);
    }

    const logoutHandler = ()=>{
        setUserLoggedIn(false);
        localStorage.removeItem("user");
        setUserDetails({});
    }

    const contextValue = {
        isLoggedIn: userLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
        userDetails:userDetails,
        setUserDetails:setUserDetails

    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;