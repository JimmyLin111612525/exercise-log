import React, {Component, createContext, useEffect, useState} from "react"

export const ViewPortContext=createContext({});

const ViewPortProvider=({children})=>{
    const[width, setWidth]=useState(window.innerWidth)
    const [height,setHeight]=useState(window.innerHeight)

    const handleWindowResize=()=>{
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }

    const useEffect=(()=>{
        window.addEventListener("resize",handleWindowResize);
        return()=>window.removeEventListener("resize",handleWindowResize)
    },[])

    return(
        <ViewPortContext.Provider value={{height,width}}>
            {children}
        </ViewPortContext.Provider>
    )
}

export default ViewPortProvider