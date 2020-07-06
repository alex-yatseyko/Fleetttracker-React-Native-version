import { useState, useCallback, useEffect } from 'react'

export const useAppContext = () => { 
    const [ships, setShips] = useState([])

    const loadShips = useCallback((data) => {
        setShips(data)
    }, [])

    return { ships, loadShips }
}