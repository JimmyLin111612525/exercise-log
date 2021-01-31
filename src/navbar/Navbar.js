import React, {useContext} from 'react'
import { auth } from '../Firestore'
import { UserContext } from '../providers/UserProvider'
import rhine from "./rhine-logo.png"
import {useHistory} from 'react-router-dom'

const Navbar=()=>{
    const history=useHistory();
    var img=document.createElement("img")
    img.src="rhine-logo.png"
    const user=useContext(UserContext)
    let email=""
    if(user){
        email=user.email
    }

    const logoClick=(e)=>{
        console.log(e.target)
        history.push('/')
    }

    return(
        user?
            <div>
                Rhine Log{" "}
                {email}{" "}
                <button onClick={()=>{auth.signOut()}}>Sign out</button>
            </div>
        :
            <>
                <div className="logo-container" onClick={(e)=>logoClick(e)}>
                    <img src={rhine} alt="Rhine Log"/>
                </div>
            </>
    )
}

export default Navbar