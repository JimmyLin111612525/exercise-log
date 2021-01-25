import React, {Component} from 'react'
import firebase from "../Firestore"

class Login_Register extends Component{
    state={
        login_or_register:true,
        login_correct:true,
        user_value:"",
        password_value:"",
        userId:"",
        partial:null
    }

    checkIfLoginCorrect=(e)=>{
        e.preventDefault();
        this.setState({login_or_register:true})

        this.checkUser()
    }

    checkIfRegisterCorrect=(e)=>{
        e.preventDefault();
        this.setState({login_or_register:false})
        this.createUser()
    }

    partialRender=()=>{
        if(this.state.user_value.trim()==="" && this.state.password_value.trim()===""){
            return(
            <div>
                <br></br>
                Username and password missing
            </div>)
        }else if(this.state.user_value.trim()==="" && !(this.state.password_value.trim()==="")){
            return(
            <div>
                <br></br>
                Username missing
            </div>)
        }else if(!(this.state.user_value.trim()==="") && this.state.password_value.trim()===""){
            return(
            <div>
                <br></br>
                Password missing
            </div>)
        }else{
            if(this.state.login_or_register){
                return(
                <div>
                    <br></br>
                    Username and/or password incorrect
                </div>)
            }else{
                return(
                    <div>
                        <br></br>
                        A user already exists with that username
                    </div>)
            }
        }
    }

    checkUser=()=>{
        let username=this.state.user_value
        let password=this.state.password_value
        let empty=true
        let userRef=null
        if(!(username.trim()==="" || password.trim()==="")){
            const db=firebase.firestore()
            let users= db.collection('users').where('username','==',username).where('password','==',password)
            users.get().then((querySnapshot)=>{
                empty=querySnapshot.empty
                if(!querySnapshot.empty){
                    querySnapshot.forEach((doc)=>{
                        userRef=doc
                    })
                }
            }).then(()=>{
                if(!empty){
                    this.setState({login_correct:true,userId:userRef.id,partial:null})
                }else{
                    let partial=this.partialRender()
                    this.setState({login_correct:false,partial:partial})
                }
            })
        }else{
            let partial=this.partialRender()
            this.setState({login_correct:false, partial:partial})

        }
    }

    createUser=()=>{
        let username=this.state.user_value
        let password=this.state.password_value
        let empty=true
        console.log(this.state.user_value, this.state.password_value)
        if(!(username.trim()==="" || password.trim()==="")){
            const db=firebase.firestore()
            let existing_users= db.collection('users').where('username','==',username)
            existing_users.get().then((querySnapshot)=>{
                empty=querySnapshot.empty
            }).then(()=>{
                if(empty){
                    const userRef=db.collection("users").add({
                        username: username,
                        password: password
                    }).then((doc)=>{
                        this.setState({login_correct:true, userId:doc.id, partial:null})
                    })
                }else{
                    let partial=this.partialRender()
                    this.setState({login_correct:false,partial:partial})
                }
            })
        }else{
            let partial=this.partialRender()
            this.setState({login_correct:false,partial:partial})
        }
    }

    upDateUsername=(e)=>{
        this.setState({user_value:e.target.value})
    }

    upDatePassword=(e)=>{
        this.setState({password_value:e.target.value})
    }

    render(){
        return(
            <div>
                Login
                {this.state.partial}
                <br></br>
                <input type="text" id="username" onChange={this.upDateUsername} value={this.state.user_value} placeholder="Username"/>
                <br></br>
                <input type="password" id="password" onChange={this.upDatePassword} value={this.state.password_value} placeholder="Password"/>
                <br></br>
                <button type="button" id="login-in-button" onClick={this.checkIfLoginCorrect}>Log In</button>
                <button type="button" id="register-button" onClick={this.checkIfRegisterCorrect}>Register</button>
                <a></a>
            </div>
        )
    }
}

export default Login_Register