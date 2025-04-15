import { createContext, useState, useEffect } from "react";

export const UnicornContext = createContext()

export const UnicornProvider = ({children}) => {
    const [unicorns, setUnicorns] = useState([])

    const getUnicorns = async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        setUnicorns(data)
    }

    useEffect(() => {
        getUnicorns()
    }, [])

    return(
        <UnicornContext.Provider value={{unicorns, setUnicorns}}>
            {children}
        </UnicornContext.Provider>
    )
}