import React from 'react'

const MODAL_STYLES={
    position:"fixed",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    backgroundColor:'#363636',
    border: '1px solid #535353',
    borderRadius:'10px',
    padding:'30px',
    zIndex:1000
}

const OVERLAY_STYLES={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0.7)',
    zIndex:1000
}

export default function DeleteLogModal({open,children,onClose,confirmDel}) {
    if(!open){
        return null
    }

    return (
        <>
        <div style={OVERLAY_STYLES}/>
        <div style={MODAL_STYLES}>
            {children}
            <div id="confirmation">
                <br></br>
                <div id="confirm-del" onClick={confirmDel}>
                    Yes
                </div>
                <div id="reject-del" onClick={onClose}>
                    No
                </div>
            </div>
        </div>
        </>
    )
}
