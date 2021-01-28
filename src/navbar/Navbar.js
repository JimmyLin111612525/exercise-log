import React, {Component,useContext,useState} from 'react'
import { auth } from '../Firestore'
import { UserContext } from '../providers/UserProvider'

const Navbar=()=>{
    const user=useContext(UserContext)
    let displayName=""
    if(user){
        displayName=user.displayName
    }
    return(
        user?
            <div>
                Rhine Log{" "}
                {displayName}{" "}
                <button onClick={()=>{auth.signOut()}}>Sign out</button>
            </div>
        :
            <div>
                Rhine Log
            </div>
    )
}

export default Navbar