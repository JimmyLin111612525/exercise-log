import React, { useState, createContext } from 'react';

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState(null)
    const [date, setDate] = useState(null)
    const [exercises, setExercises] = useState(null)
    return (
        <UserContext.Provider value={{
            user: [user, setUser],
            date: [date, setDate],
            exercises: [exercises, setExercises]
        }}>
            {props.children}
        </UserContext.Provider>
    )
}