import React, {Component,useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {auth, generateUserDocument} from "../Firestore"

const Register=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [username, setUserName]=useState("")
    const [error,setError]=useState(null)

    const createUserWithEmailAndPasswordHandler=async(e,email,password)=>{
        e.preventDefault()
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password)
            generateUserDocument(user, {username,password})
        }catch(error){
            setError("Error signing up with email and password")
        }

        setEmail("")
        setPassword("")
        setUserName("")
    }

    const upDateUsername=(e)=>{
        setUserName(e.target.value)
    }

    const upDateEmail=(e)=>{
        setEmail(e.target.value)
    }

    const upDatePassword=(e)=>{
        setPassword(e.target.value)
    }

        return(
            <div>
                <h1>
                    Sign up
                </h1>

                <form>
                    <label> Username:{" "}</label>
                    <input type="text" value={username} onChange={(e)=>upDateUsername(e)}/>
                    <br></br>
                    <label>Email:{" "}</label>
                    <input type="email" value={email} onChange={(e)=>upDateEmail(e)}/>
                    <br></br>
                    <label>Password:{" "}</label>
                    <input type="password" value={password} onChange={(e)=>upDatePassword(e)}/>
                    <br></br>
                    <button onClick={e=>{createUserWithEmailAndPasswordHandler(e,email,password)}}>Sign up</button>
                    <br></br>
                    <p>
                        Already have an account?{" "}
                        <Link to='/'>Sign in here</Link>
                    </p>
                </form>
            </div>
        )
    
}

export default Register