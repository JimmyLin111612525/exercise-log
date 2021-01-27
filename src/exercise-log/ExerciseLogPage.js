import React, {Component, useContext,useEffect,useState} from 'react'
import { auth, firestore } from '../Firestore'
import { UserContext } from '../providers/UserProvider'

const ExerciseLogPage=()=>{
    const[text,setText]=useState('')
    const[date,setDate]=useState('')


    const user=useContext(UserContext)
    const {displayName, email}=user
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let cur_date = mm + '/' + dd + '/' + yyyy;

    useEffect(()=>{
        let docs=firestore.collection('logs').where('date','==', cur_date).where('uid','==',user.uid)
        let empty=false
        let doc_found
        docs.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                doc_found=doc
            })
            empty=querySnapshot.empty
        }).then(()=>{
            if (empty){
                setText('')
            }else{
                firestore.collection('logs').doc(doc_found.id).get().then((d)=>{
                    setText(d.data().text)
                })
            }
        })
    },[])

    const upDateText=(e)=>{
        setText(e.target.value)
    }

    const saveLog=(e,date,text)=>{
        let docs=firestore.collection('logs').where('date','==', cur_date).where('uid','==',user.uid)
        let empty=false
        let doc_found
        docs.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                doc_found=doc
            })
            empty=querySnapshot.empty
        }).then(()=>{
            if(empty==true){
                console.log("make new document")
                firestore.collection('logs').doc().set({date:cur_date,text:text,uid:user.uid})
            }
            else{
                console.log("update document")
                firestore.collection('logs').doc(doc_found.id).update({text:text})
            }
        })
        console.log(text,", ",cur_date)
    }

        return (
            <div>
                <h1>Log for {cur_date}</h1>
                <label>Text:{" "}</label>
                <input type="text" value={text} onChange={(e)=>upDateText(e)}/>{" "}
                <button onClick={(e)=>saveLog(e, date,text)}>Save</button>
            </div>
        )
    
}
export default ExerciseLogPage