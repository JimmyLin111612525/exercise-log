import React, { Component, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, generateUserDocument } from "../Firestore"
import BarLoader from "react-spinners/BarLoader";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [partial, setPartial] = useState("")
    const [loading, setLoading] = useState(null)

    const createUserWithEmailAndPasswordHandler = async (e, email, password) => {
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
        // try{
        //     const {user} = await auth.createUserWithEmailAndPassword(email,password)
        //     generateUserDocument(user, {password})
        // }catch(error){
        //     setError("Error signing up with email and password")
        //     setPartial(
        //         <p id="error">
        //             {error.message}
        //         </p>
        //     )
        // }
        let request = new XMLHttpRequest();
        setLoading(true)
        request.onreadystatechange = (res) => {
            if (res.target.readyState == 4 && res.target.status == 200) {
                console.log(res.target.responseText)
                if (res.target.responseText === "invalid-email") {
                    setPartial(
                        <p id="error">
                            Invalid email.
                        </p>
                    )
                }
                else if (res.target.responseText === "existing-user") {
                    setPartial(
                        <p id="error">
                            An existing user has that email. Please use another email.
                        </p>
                    )
                }
                setLoading(false)
            }
        }
        request.open("GET", `http://localhost:8080/bigQueryServer-1.0-SNAPSHOT/api/controller/insertNewUser/email=${email}&password=${password}`, true);
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
        <div className="register-frame">
            <div className="register">
                <p id="register-banner">
                    Register an account
                    </p>
                {partial}
                <form>
                    <div className="register-info">
                        <label className="e-mail">Email:{" "}</label>
                    </div>
                    <input type="email" value={email} placeholder="Enter your e-mail" onChange={(e) => upDateEmail(e)} />
                    <br></br>
                    <br></br>
                    <div className="register-info">
                        <label className="password">Password:{" "}</label>
                    </div>
                    <input type="password" value={password} placeholder="Enter your password" onChange={(e) => upDatePassword(e)} />
                    <br></br>
                    <br></br>
                    <div className="register-button" onClick={e => { createUserWithEmailAndPasswordHandler(e, email, password) }}>Sign up</div>
                    <br></br>
                    <div className="login-container">
                        <p>
                            Already have an account?{" "}
                            <Link id="login-link" to='/'>Log in here</Link>
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

export default Register