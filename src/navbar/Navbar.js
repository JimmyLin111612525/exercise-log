import React, {useContext, useEffect, useState} from 'react'
import { auth } from '../Firestore'
import { UserContext } from '../UserContext'
import rhine from "./rhine-logo.png"
import {useHistory} from 'react-router-dom'
import { ViewPortContext } from '../providers/ViewPortProvider'

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
  
    return windowSize;
  }

function Navbar(){
    const size=useWindowSize()
    const breakpoint=500;
    const history=useHistory();
    var img=document.createElement("img")
    img.src="rhine-logo.png"
    const {user}=useContext(UserContext)
    const [userEntered,setUserEntered]=user
    const viewport=useContext(ViewPortContext)
    let email=""
    if(userEntered){
        email=userEntered.email
    }   
    
    const logoClick=(e)=>{
        console.log(e.target)
        history.push('/')
    }

    const signOut=(e)=>{
      setUserEntered(null)
      let request = new XMLHttpRequest();
        
        request.onreadystatechange = (res) => {
            if (res.target.readyState == 4 && res.target.status == 200) {
                console.log(res.target.responseText)
            }
        }
        request.open("GET", `http://localhost:8080/bigQueryServer-1.0-SNAPSHOT/api/controller/signOut`, true);
        request.send();
      console.log("sign out")
    }

    return(
      userEntered?
            <div>
                <div id="profile-nav">
                    <img id="profile-logo" onClick={(e)=>logoClick(e)} src={rhine} alt="Rhine Log"/>
                        <p id="email-nav">{size.width>breakpoint?email:""}</p>
                        <div className="sign-out" onClick={signOut}>Sign out</div>
                </div>
                
            </div>
        :
            <>
                <div className="logo-container" onClick={(e)=>logoClick(e)}>
                    <img id="sign-in-up-logo" src={rhine} alt="Rhine Log"/>
                </div>
            </>
    )
}

export default Navbar