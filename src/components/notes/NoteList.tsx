import AddNote from './AddNote';
import Note from './Note'
import React from 'react'
import { reformatDate } from '../utilities/utilFunctions';

const NotesList = ( {notes, handleAddNote, deleteNote}) => {
    let sortedNotes = notes.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)
    return (
        <>
            { notes? 
                <div className="notes-list">
                    {sortedNotes.map((note) => (
                        <>
                        <Note
                            key={note.id} 
                            id={note.id} 
                            title={note.title} 
                            body={note.body} 
                            created_at={reformatDate(note.created_at, "dd/MM/yyyy")} 
                            deleteNote={deleteNote}
                            />
                        </>
                    ))}
                    <AddNote handleAddNote={handleAddNote}/>
                </div> : null
            }
        </>
                
    );
}

export default NotesList;