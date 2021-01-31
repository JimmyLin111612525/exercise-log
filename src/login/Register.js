import React, {Component,useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {auth, generateUserDocument} from "../Firestore"

const Register=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [displayName, setDisplayName]=useState("")
    const [error,setError]=useState(null)
    const [partial,setPartial]=useState("")

    const createUserWithEmailAndPasswordHandler=async(e,email,password)=>{
        e.preventDefault()
        setPartial("")
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password)
            generateUserDocument(user, {displayName,password})
        }catch(error){
            setError("Error signing up with email and password")
            setPartial(
                <p id="error">
                    {error.message}
                </p>
            )
        }

        setEmail("")
        setPassword("")
        setDisplayName("")
    }

    const upDateDisplayName=(e)=>{
        setDisplayName(e.target.value)
    }

    const upDateEmail=(e)=>{
        setEmail(e.target.value)
    }

    const upDatePassword=(e)=>{
        setPassword(e.target.value)
    }

        return(
            <div className="register-frame">
                <div className="register">
                    <p id="register-banner">
                        Register an account
                    </p>
                    {partial}
                    <form>
                        <div className="register-info">
                            <label className="username"> Username:{" "}</label>
                        </div>
                        <input type="text" value={displayName} placeholder="Enter a username" onChange={(e)=>upDateDisplayName(e)}/>
                        <br></br>
                            <br></br>
                        <div className="register-info">
                            <label className="e-mail">Email:{" "}</label>
                        </div>
                        <input type="email" value={email} placeholder="Enter your e-mail" onChange={(e)=>upDateEmail(e)}/>
                        <br></br>
                            <br></br>
                        <div className="register-info">
                            <label className="password">Password:{" "}</label>
                        </div>
                        <input type="password" value={password} placeholder="Enter your password" onChange={(e)=>upDatePassword(e)}/>
                        <br></br>
                            <br></br>
                        <div className="register-button" onClick={e=>{createUserWithEmailAndPasswordHandler(e,email,password)}}>Sign up</div>
                        <br></br>
                        <div className="login-container">
                            <p>
                                Already have an account?{" "}
                                <Link id="login-link" to='/'>Log in here</Link>
                            </p>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    
}

export default Register