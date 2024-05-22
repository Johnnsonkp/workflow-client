import React, {useState} from 'react'

import NotesList from './NotesList';
import SearchBar from "../components/SearchBar";

const AllNotes = ({notes, addNote, deleteNote}) => {
    const createNote = (text) =>{
        addNote(text)
    }
    const [searchText, setSearchText] = useState();
    const SearchedText = notes.filter((note) => note.title.toLowerCase().includes(searchText))

    return (
        <div className="notes-container">
            <h1 style={{ textAlign: "left", color: '#fff', fontWeight: 'bold', fontSize: '30px', marginBottom: '0px' }}>NOTES</h1>
            <SearchBar handleSearchNote={setSearchText} style={{ marginTop: '0px'}}/>
            <NotesList 
                notes={searchText ? SearchedText : notes} 
                handleAddNote={createNote} 
                deleteNote={deleteNote}/>
        </div>
    )
}

export default AllNotes;



