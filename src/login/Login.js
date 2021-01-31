import React, {useState} from 'react'
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
                <p id="error">
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
                <div className="log-in-frame">
                    <div className="log-in">
                        <span id="log-in-welcome">WELCOME</span>
                        <p id="log-in-banner">Log into your account</p>
                        
                        {partial}
                        <form>
                            <div className="login-info">
                                <label className="e-mail">E-Mail</label>
                            </div>
                            
                            <input type="email" value={email}  placeholder="Enter your e-mail" onChange={(e)=>upDateEmail(e)}/>
                            <br></br>
                            <br></br>
                            <div className="login-info">
                                <label className="password login-info">Password</label>
                            </div>
                            <input type="password" value={password} placeholder="Enter your password" onChange={(e)=>upDatePassword(e)}/>
                            <br></br>
                            <br></br>
                            <div className="log-in-button" onClick={(e)=>{signInWithEmailAndPasswordHandler(e,email,password)}}>Log in</div>
                            <br></br>
                            <div className="register-container">
                                <p>
                                    Don't have an account?{" "}
                                    <Link id="register-link" to='/register'>Register here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
        )
    
}

export default Login