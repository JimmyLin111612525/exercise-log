import React, {Component,useState} from 'react'
import {Link} from 'react-router-dom'
import { auth } from '../Firestore'

const Login=()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [error, setError]=useState(null)
    const [partial, setPartial]=useState("")
    
    const signInWithEmailAndPasswordHandler = (e,email,password)=>{
        e.preventDefault()
        setPartial("")
        auth.signInWithEmailAndPassword(email,password).catch(error=>{
            setError("Error signing in with password and email.")
            setPartial(
                <p>
                    {error.message}
                </p>
            )
        })
    }

    const upDateEmail=(e)=>{
        setEmail(e.target.value)
    }

    const upDatePassword=(e)=>{
        setPassword(e.target.value)
    }

        return(
            <div>
                <h1>Sign In</h1>
                {partial}
                <form>
                    <label>Email:{" "}</label>
                    <input type="email" value={email} onChange={(e)=>upDateEmail(e)}/>
                    <br></br>
                    <label>Password:{" "}</label>
                    <input type="password" value={password} onChange={(e)=>upDatePassword(e)}/>
                    <br></br>
                    <button onClick={(e)=>{signInWithEmailAndPasswordHandler(e,email,password)}}>Sign in</button>
                    <br></br>
                    <p>
                        Don't have an account?{" "}
                        <Link to='/register'>Register here</Link>
                    </p>
                    
                </form>
            </div>
        )
    
}

export default Login