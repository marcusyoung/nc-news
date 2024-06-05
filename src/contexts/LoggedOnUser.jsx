import { createContext, useState } from "react";

export const LoggedOnUserContext = createContext()

export const LoggedOnUserProvider = ({children}) => {

    // logged on user is hard coded for now
    const [loggedOnUser, setLoggedOnUser] = useState("")

    return <LoggedOnUserContext.Provider value={{loggedOnUser, setLoggedOnUser}}>{children}</LoggedOnUserContext.Provider>
}