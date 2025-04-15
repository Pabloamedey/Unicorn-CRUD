import { createContext, useState, useEffect } from "react";

export const UnicornContext = createContext()

export const UnicornProvider = ({children}) => {
    const [unicorns, setUnicorns] = useState([])

    const getUnicorns = async () => {
        const response = await fetch('https://crudcrud.com/api/c07d76081fe44feba1c91a6c05b60dc4/unicorns')
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