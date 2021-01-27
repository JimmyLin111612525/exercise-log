import React, {useContext,useEffect,useState} from 'react'
import { auth, firestore } from '../Firestore'
import { UserContext } from '../providers/UserProvider'

const ExerciseLogPage=()=>{
    const[text,setText]=useState('')
    const[date,setDate]=useState('')


    const user=useContext(UserContext)
    //const {displayName, email}=user
    

    

    useEffect(()=>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let cur_date = mm + '/' + dd + '/' + yyyy;

        let docs=firestore.collection('logs').where('date','==', cur_date).where('uid','==',user.uid)
        setDate(`${yyyy}-${mm}-${dd}`)
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

    const upDateDate=(e)=>{
        setDate(e.target.value)
        console.log(e.target.value)
    }

    const saveLog=(e,date,text)=>{
        let splitted=date.split("-")
        let new_date=`${splitted[1]}/${splitted[2]}/${splitted[0]}`
        console.log(new_date)
        let docs=firestore.collection('logs').where('date','==', new_date).where('uid','==',user.uid)
        let empty=false
        let doc_found
        docs.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                doc_found=doc
            })
            empty=querySnapshot.empty
        }).then(()=>{
            if(empty){
                console.log("make new document")
                firestore.collection('logs').doc().set({date:new_date,text:text,uid:user.uid})
            }
            else{
                console.log("update document")
                firestore.collection('logs').doc(doc_found.id).update({text:text})
            }
        })
        console.log(text,", ",new_date)
    }

        return (
            <div>
                <h1>Log for {date}</h1>
                <label>Change date: {" "}</label>
                <input type="date" value={date} onChange={(e)=>upDateDate(e)}/>
                <br></br>
                <br></br>
                <label>Text:{" "}</label>
                <input type="text" value={text} onChange={(e)=>upDateText(e)}/>{" "}
                <button onClick={(e)=>saveLog(e, date,text)}>Save</button>
            </div>
        )
    
}
export default ExerciseLogPage