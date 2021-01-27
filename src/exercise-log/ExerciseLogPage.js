import React, {Component, useContext} from 'react'
import { auth } from '../Firestore'
import { UserContext } from '../providers/UserProvider'

const ExerciseLogPage=()=>{
    const user=useContext(UserContext)
    const {displayName, email}=user
    console.log(user)
        return (
            <div>
                <h1>Hello!</h1>
                <h2>{displayName}</h2>
                <h3>{email}</h3>
                
            </div>
        )
    
}
export default ExerciseLogPage