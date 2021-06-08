import React, { useContext, useEffect, useState } from 'react'
import { auth, firestore } from '../Firestore'
import { UserContext } from '../UserContext'
import BarLoader from "react-spinners/BarLoader";


import DeleteLogModal from "../modal/DeleteLogModal"

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


function ExerciseLogPage() {
    const size = useWindowSize()
    const breakpoint = 540;
    const [text, setText] = useState('')
    const [exercises, setExercises] = useState([])
    const [empty, setEmpty] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const user = useContext(UserContext)
    const { date } = user
    const [curDate, setCurDate] = date

    useEffect(() => {
        let request = new XMLHttpRequest();
        setLoading(true)
        request.onreadystatechange = (res) => {
            if (res.target.readyState == 4 && res.target.status == 200) {
                console.log(JSON.parse(res.target.responseText))
                if (JSON.parse(res.target.responseText).length === 0) {
                    setExercises([])
                    setText("")
                } else {
                    setExercises(JSON.parse(JSON.parse(res.target.responseText)[1]))
                    setText(JSON.parse(res.target.responseText)[2])
                }
                setLoading(false)
            }
        }
        request.open("GET", `http://localhost:8080/bigQueryServer-1.0-SNAPSHOT/api/controller/getLogs`, true);
        request.send();
    }, [])

    const upDateText = (e) => {
        setText(e.target.value)
        console.log(text)
    }

    const upDateDate = (e) => {

        let splitted = e.target.value.split("-")
        setCurDate(e.target.value)
        setLoading(true)
        let request = new XMLHttpRequest();
        request.onreadystatechange = (res) => {
            if (res.target.readyState == 4 && res.target.status == 200) {
                console.log(JSON.parse(res.target.responseText))
                if (JSON.parse(res.target.responseText).length === 0) {
                    setExercises([])
                    setText("")
                } else {
                    setExercises(JSON.parse(JSON.parse(res.target.responseText)[1]))
                    setText(JSON.parse(res.target.responseText)[2])
                }
                setLoading(false)

            }
        }
        request.open("GET", `http://localhost:8080/bigQueryServer-1.0-SNAPSHOT/api/controller/getLogByDate/date=${e.target.value}`, true);
        request.send();
        console.log(e.target.value)
    }

    const saveLog = (e, date, text) => {

        // let splitted=date.split("-")
        // let new_date=`${splitted[1]}/${splitted[2]}/${splitted[0]}`
        // console.log(new_date)
        // let docs=firestore.collection('logs').where('date','==', new_date).where('uid','==',user.uid)
        // let empty=false
        // let doc_found
        // docs.get().then((querySnapshot)=>{
        //     querySnapshot.forEach((doc)=>{
        //         doc_found=doc
        //     })
        //     empty=querySnapshot.empty
        // }).then(()=>{

        //     if(empty){
        //         if(exercises.length===0){
        //             return
        //         }
        //         console.log("make new document")
        //         firestore.collection('logs').doc().set({date:new_date,text:text.trim(),uid:user.uid,exercises:JSON.stringify(exercises)})
        //         setEmpty(false)
        //     }
        //     else{
        //         console.log("update document")
        //         firestore.collection('logs').doc(doc_found.id).update({text:text.trim(),exercises:JSON.stringify(exercises)})
        //         setEmpty(false)
        //     }
        // })
        console.log(exercises)
        let request = new XMLHttpRequest();
        request.onreadystatechange = (res) => {
            if (res.target.readyState == 4 && res.target.status == 200) {
                console.log(res.target.responseText)
            }
        }
        request.open("GET", `http://localhost:8080/bigQueryServer-1.0-SNAPSHOT/api/controller/saveLog/exercises=${JSON.stringify(exercises)}&text=${text}`, true);
        request.send();
    }

    const addExercise = (e) => {

        //add a new exercise object
        let exercise = {
            exer_name: "",
            weight: 0,
            sets: 0,
            reps: 0
        }

        setExercises(exercises.concat(exercise))
        console.log(exercises)
    }

    const updateExercise = (e) => {
        const id = e.target.id.split("-")[2]
        console.log(id)
        let arr = [...exercises]
        arr[parseInt(id)] = { ...arr[parseInt(id)], exer_name: e.target.value }
        setExercises(arr)
        console.log(exercises)
    }

    const updateWeight = (e) => {
        const id = e.target.id.split("-")[2]
        let arr = [...exercises]
        arr[parseInt(id)] = { ...arr[parseInt(id)], weight: parseInt(e.target.value, 10) }
        setExercises(arr)
        console.log(exercises)
    }

    const updateSets = (e) => {
        const id = e.target.id.split("-")[2]
        let arr = [...exercises]
        arr[parseInt(id)] = { ...arr[parseInt(id)], sets: parseInt(e.target.value, 10) }
        setExercises(arr)
        console.log(exercises)
    }

    const updateReps = (e) => {
        const id = e.target.id.split("-")[2]
        let arr = [...exercises]
        arr[parseInt(id)] = { ...arr[parseInt(id)], reps: parseInt(e.target.value, 10) }
        setExercises(arr)
        console.log(exercises)
    }

    const deleteExercise = (e) => {
        const id = e.target.id.split("-")[2]
        console.log("delete exercise " + id)
        let arr = [...exercises]
        arr.splice(parseInt(id), 1)
        setExercises(arr)
    }

    const deleteLog = (e) => {
        console.log("delete log")
        let splitted = date.split("-")
        let new_date = `${splitted[1]}/${splitted[2]}/${splitted[0]}`
        console.log(new_date)
        let docs = firestore.collection('logs').where('date', '==', new_date).where('uid', '==', user.uid)
        let empty = false
        let doc_found
        docs.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc_found = doc
            })
            empty = querySnapshot.empty
        }).then(() => {
            if (!empty) {
                firestore.collection('logs').doc(doc_found.id).delete().then(() => {
                    console.log("deleted doc")
                    setText('')
                    setExercises([])
                })
                setEmpty(true)
                setIsOpen(false)
            } else {
                console.log("doc doesn't exist")
            }
        })
    }

    const moveExerUp = (e) => {
        const id = e.target.id.split("-")[2]


        const index = parseInt(id);

        let arr = [...exercises]
        if (index > 0) {
            console.log(`move exercise ${index} up`)
            let temp = arr[index - 1]
            arr[index - 1] = arr[index]
            arr[index] = temp
            setExercises(arr)
        }
    }

    const moveExerDown = (e) => {
        const id = e.target.id.split("-")[2]
        const index = parseInt(id);

        let arr = [...exercises]
        console.log(arr.length)
        if (index < arr.length - 1) {
            console.log(`move exercise ${index} down`)
            let temp = arr[index + 1]
            arr[index + 1] = arr[index]
            arr[index] = temp
            setExercises(arr)
        }
    }

    return (
        <div className="exercise-log-page">
            <h1>{size.width > breakpoint ? "Log for " : ""}{`${curDate.split("-")[1]}/${curDate.split("-")[2]}/${curDate.split("-")[0]}`}</h1>
            <label>Date: {" "}</label>
            <input className="date-picker" type="date" value={curDate} onChange={(e) => upDateDate(e)} />{" "}
            <div id="add-exer-button" onClick={(e) => addExercise(e)}>{size.width > breakpoint ? "Add an exercise" : "+"}</div>{" "}
            {!empty &&
                <div id="del-exer-button" onClick={() => setIsOpen(true)}>{size.width > breakpoint ? "Delete log" : "-"}</div>
            }
            <br></br>
            <br></br>
            {exercises.length > 0 ? <h3>Exercises for the day</h3> : ""}

            {
                exercises.map((exercise, index) => {
                    return (
                        <div className="exercises" id={`exercise-${index}`} key={`${index}`}>
                            <div className="exercise-label-container">
                                <span className="exercise-label">{size.width > breakpoint ? "Exercise " : ""}{index + 1}: {" "}</span>
                                <input class="exer-inp" id={`exer-inp-${index}`} type="text" value={exercise.exer_name} placeholder="Enter the name of the exercise" onChange={(e) => updateExercise(e)} />{" "}
                            </div>
                            <div className="exercise-specs">
                                <div>
                                    <label className="exer-spec" >Weight:</label>{" "}
                                    <input id={`weight-inp-${index}`} type="number" value={exercise.weight} min="0" onChange={(e) => updateWeight(e)} />

                                    {" "}
                                </div>
                                <div>
                                    <label className="exer-spec">Sets:</label>{" "}
                                    <input id={`sets-inp-${index}`} type="number" min="0" value={exercise.sets} onChange={(e) => updateSets(e)} />{" "}
                                </div>
                                <div>
                                    <label className="exer-spec">Reps:</label>{" "}
                                    <input id={`reps-inp-${index}`} type="number" min="0" value={exercise.reps} onChange={(e) => updateReps(e)} />{" "}
                                </div>
                            </div>
                            <br></br>
                            <div className="exercise-options">

                                <div className="move-exer-up" id={`move-up-${index}`} onClick={(e) => { moveExerUp(e) }}>Move up</div>
                                <div className="move-exer-down" id={`move-down-${index}`} onClick={(e) => { moveExerDown(e) }}>Move down</div>
                                <div className="delete-exercise" id={`del-exer-${index}`} onClick={(e) => { deleteExercise(e) }}>Remove Exercise</div>
                            </div>
                            <br></br>
                        </div>
                    )
                })
            }
            <br></br>
            <label>Notes:{" "}</label>
            <br></br>
            <textarea id="comment-box" type="text" value={text} onChange={(e) => upDateText(e)} />
            <br></br>
            <div id="save-button" onClick={(e) => saveLog(e, curDate, text)}>Save log</div>
            <hr></hr>
            <p>To ensure that changes made to a log are saved, click on Save.</p>

            <DeleteLogModal open={isOpen} onClose={() => setIsOpen(false)} confirmDel={deleteLog}>
                Are you sure you want to delete this log? Deleted logs are irretrievable.
                </DeleteLogModal>

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
export default ExerciseLogPage