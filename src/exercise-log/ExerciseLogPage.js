import React, {useContext,useEffect,useState} from 'react'
import { auth, firestore } from '../Firestore'
import { UserContext } from '../providers/UserProvider'

const ExerciseLogPage=()=>{
    const[text,setText]=useState('')
    const[date,setDate]=useState('')
    const[exercises,setExercises]=useState([])

    const user=useContext(UserContext)

    useEffect(()=>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
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
                setExercises([])
            }else{
                firestore.collection('logs').doc(doc_found.id).get().then((d)=>{
                    setText(d.data().text)
                    setExercises(JSON.parse(d.data().exercises))
                    //console.log(d.data().exercises)
                })
            }
        })
    },[])

    const upDateText=(e)=>{
        setText(e.target.value)
        console.log(text)
    }

    const upDateDate=(e)=>{
        let splitted=e.target.value.split("-")
        let new_date=`${splitted[1]}/${splitted[2]}/${splitted[0]}`

        setDate(e.target.value)
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
                setText('')
                setExercises([])
                console.log("no log")
            }
            else{
                firestore.collection('logs').doc(doc_found.id).get().then((d)=>{
                    setText(d.data().text)
                    setExercises(JSON.parse(d.data().exercises))
                    console.log(d.data().exercises)
                })
            }
        })
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
                firestore.collection('logs').doc().set({date:new_date,text:text.trim(),uid:user.uid,exercises:JSON.stringify(exercises)})
            }
            else{
                console.log("update document")
                firestore.collection('logs').doc(doc_found.id).update({text:text.trim(),exercises:JSON.stringify(exercises)})
            }
        })
        console.log(text,", ",new_date)
    }

    const addExercise=(e)=>{

        //add a new exercise object
        let exercise={
            exer_name:"",
            weight:0,
            sets:0,
            reps:0
        }
            
        setExercises(exercises.concat(exercise))
        console.log(exercises)
    }

    // const updateMetric=(e)=>{
    //     const id=e.target.id.split("-")[2]
    //     let arr=[...exercises]
    //     arr[parseInt(id)]={...arr[parseInt(id)],metric:e.target.value}
    //     setExercises(arr)
    //     console.log(exercises)
    // }

    const updateExercise=(e)=>{
        const id=e.target.id.split("-")[2]
        console.log(id)
        let arr=[...exercises]
        arr[parseInt(id)]={...arr[parseInt(id)],exer_name:e.target.value}
        setExercises(arr)
        console.log(exercises)
    }

    const updateWeight=(e)=>{
        const id=e.target.id.split("-")[2]
        let arr=[...exercises]
        arr[parseInt(id)]={...arr[parseInt(id)],weight:parseInt(e.target.value,10)}
        setExercises(arr)
        console.log(exercises)
    }

    const updateSets=(e)=>{
        const id=e.target.id.split("-")[2]
        let arr=[...exercises]
        arr[parseInt(id)]={...arr[parseInt(id)],sets:parseInt(e.target.value,10)}
        setExercises(arr)
        console.log(exercises)
    }

    const updateReps=(e)=>{
        const id=e.target.id.split("-")[2]
        let arr=[...exercises]
        arr[parseInt(id)]={...arr[parseInt(id)],reps:parseInt(e.target.value,10)}
        setExercises(arr)
        console.log(exercises)
    }

    const deleteExercise=(e)=>{
        const id=e.target.id.split("-")[2]
        console.log("delete exercise "+id)
        let arr=[...exercises]
        arr.splice(parseInt(id),1)
        setExercises(arr)
    }

    const deleteLog=(e)=>{
        console.log("delete log")
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
            if(!empty){
                firestore.collection('logs').doc(doc_found.id).delete().then(()=>{console.log("deleted doc")
                setText('')
                setExercises([])})
                
            }else{
                console.log("doc doesn't exist")
            }
        })
    }

        return (
            <div>
                <h1>Log for {date}</h1>
                <label>Change date: {" "}</label>
                <input type="date" value={date} onChange={(e)=>upDateDate(e)}/>{" "}
                <button onClick={(e)=>addExercise(e)}>Add an exercise</button>{" "}
                <button onClick={(e)=>deleteLog(e)}>Delete log</button>
                <br></br>
                <h3>Exercises for the day</h3>
                {
                    exercises.map((exercise,index)=>{
                        return(
                            <div id={`exercise-${index}`} key={`${index}`}>
                                <label>Exercise {index+1}: {" "}</label>
                                <br></br>
                                <input id={`exer-inp-${index}`} type="text" value={exercise.exer_name} onChange={(e)=>updateExercise(e)}/>{" "}
                                <label>Weight:</label>{" "}
                                <input id={`weight-inp-${index}`} type="number" value={exercise.weight} min="0" onChange={(e)=>updateWeight(e)}/>
                                
                                {" "}
                                <label>Sets:</label>{" "}
                                <input id={`sets-inp-${index}`} type="number" min="0" value={exercise.sets} onChange={(e)=>updateSets(e)}/>{" "}
                                <label>Reps:</label>{" "}
                                <input id={`reps-inp-${index}`} type="number" min="0" value={exercise.reps} onChange={(e)=>updateReps(e)}/>{" "}
                                <span id={`del-exer-${index}`} onClick={(e)=>{deleteExercise(e)}}>-</span>
                                <br></br>
                                <br></br>
                            </div>
                        )
                    })
                }
                <br></br>
                <label>Notes:{" "}</label>
                <br></br>
                <textarea id="comment-box" type="text" value={text} onChange={(e)=>upDateText(e)}/>
                <br></br>
                <button onClick={(e)=>saveLog(e, date,text)}>Save</button>
                <hr></hr>
                <p>To ensure that changes made to a log are saved, click on Save.</p>
                <p>Deleted logs are irretrievable.</p>
            </div>
        )
    
}
export default ExerciseLogPage