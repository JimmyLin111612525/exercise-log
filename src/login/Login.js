import React, { Component, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Firestore'

import BarLoader from "react-spinners/BarLoader";

import { UserContext } from "../UserContext"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [partial, setPartial] = useState("")
    const [loading, setLoading] = useState(null)

    const { user, date } = useContext(UserContext)

    const [userEntered, setUserEntered] = user
    const [curDate, setCurDate] = date

    const signInWithEmailAndPasswordHandler = (e, email, password) => {
        e.preventDefault()
        setPartial("")

        if (email === "") {
            setPartial(
                <p id="error">
                    Please enter an email.
                </p>
            )
            return;
        } else if (password === "") {
            setPartial(
                <p id="error">
                    Please enter a password.
                </p>
            )
            return;
        }
        // auth.signInWithEmailAndPassword(email,password).catch(error=>{
        //     setError("Error signing in with password and email.")
        //     setPartial(
        //         <p id="error">
        //             {error.message}
        //         </p>
        //     )
        // })
        let request = new XMLHttpRequest();
        setLoading(true)
        request.onreadystatechange = (res) => {
            if (res.target.readyState == 4 && res.target.status == 200) {
                if (res.target.responseText === "user-not-found") {
                    setPartial(
                        <p id="error">
                            Email and/or password incorrect.
                        </p>
                    )

                } else if (res.target.responseText === "something happened") {
                    console.log("something happened")
                }
                else {
                    console.log('user exists')
                    console.log(res.target.responseText)
                    setCurDate(res.target.responseText)
                    setUserEntered(email)
                }
                setLoading(false);
            }
        }
        request.open("GET", `http://localhost:8080/bigQueryServer-1.0-SNAPSHOT/api/controller/login/email=${email}&password=${password}`, true);
        request.send();

        // setEmail("")
        // setPassword("")
    }

    const upDateEmail = (e) => {
        setEmail(e.target.value)
    }

    const upDatePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="log-in-frame">
            <div className="log-in">
                <span id="log-in-welcome">WELCOME</span>
                <p id="log-in-banner">Log into your account</p>

                {partial}
                <form>
                    <div className="login-info">
                        <label className="e-mail">E-Mail</label>
                    </div>

                    <input type="email" value={email} placeholder="Enter your e-mail" onChange={(e) => upDateEmail(e)} />
                    <br></br>
                    <br></br>
                    <div className="login-info">
                        <label className="password login-info">Password</label>
                    </div>
                    <input type="password" value={password} placeholder="Enter your password" onChange={(e) => upDatePassword(e)} />
                    <br></br>
                    <br></br>
                    <div className="log-in-button" onClick={(e) => { signInWithEmailAndPasswordHandler(e, email, password) }}>Log in</div>
                    <br></br>
                    <div className="register-container">
                        <p>
                            Don't have an account?{" "}
                            <Link id="register-link" to='/register'>Register here</Link>
                        </p>
                    </div>
                </form>
            </div>
            {loading ? (
                <div>
                    <div className="loading-screen">
                        <BarLoader
                            size={200}
                            color={'#25C5E2'}
                            loading={loading}
                        // margin={20}
                        />
                    </div>
                </div>
            ) : ""}
        </div>
    )

}

export default Login