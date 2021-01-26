import React, {Component,useState} from 'react'
import {Link} from 'react-router-dom'
import { auth } from '../Firestore'

const Login=()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [error, setError]=useState(null)

    const signInWithEmailAndPasswordHandler = (e,email,password)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password).catch(err=>{
            this.setState({error:"Error signing in with password and email."})
            console.error(("Error signing in with password and email.", this.state.error))
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
                <form>
                    <label>Email:{" "}</label>
                    <input type="email" value={email} onChange={(e)=>upDateEmail(e)}/>
                    <br></br>
                    <label>Password:{" "}</label>
                    <input type="password" value={password} onChange={(e)=>upDatePassword(e)}/>
                    <br></br>
                    <button>Sign in</button>
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