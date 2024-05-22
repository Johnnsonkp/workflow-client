import React from 'react'
// import useAppState from '../store/AppState.jsx'
import { useNavigate } from "react-router";

interface Note {
    id: number,
    title: string,
    body: string,
    created_at: string,
    deleteNote: any,
}

const Note: React.FC<Note> = ({id, title, body, created_at, deleteNote}) => {
    // const Navigate = useNavigate()
    // const {state, dispatch} = useAppState()

    const note = {
        id: id,
        title: title, 
        body: body,
        created_at: created_at
    }
    const style = {
        mouseOver: {
           cursor: 'pointer'
        }
    }

    const selectedNote = (note: Note, e) => {
        console.log("selected note:", note)
        // dispatch({ type: "selectedNote", payload: note})

        // if(state.selectedNote){
        //   Navigate('/single-note')
        // }
    }
    // const destroyNote = (note) => {
    //     return deleteNote(note)
    // }

    const clicked = (e, note) => {
        console.log("target.value:", e.target.innerText)
        if(e.target.innerText == "X"){
            // destroyNote(note)
        } else{
            // selectedNote(note)
        }
    }

    return (
        <div className="note" onClick={(e) => clicked({e, note: Note})} style={style.mouseOver}>
            <div className="title">
                <h3>{title}</h3>
            </div>
            <div className="body" style={{overflow: 'hidden'}}>
                <span>{body ? body.substring(0, 180) : body}</span>
            </div>
            <div className="note-footer">
                <small>{created_at}</small>
                <button className="delete-icon" onClick={(e) => clicked(e, note)}>
                    X
                </button>
            </div>
        </div>
    )
}

export default Note