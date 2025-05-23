import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Load saved notes from localStorage on first render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
function editNote(id, updatedNote) {
  setNotes(prevNotes =>
    prevNotes.map((note, index) =>
      index === id ? updatedNote : note
    )
  );
}

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
  <div>
  <Header />
  <CreateArea onAdd={addNote} />
  <div className="notes-container">
    {notes.map((noteItem, index) => (
      <Note
        key={index}
        id={index}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={deleteNote}
         onEdit={editNote}
      />
    ))}
  </div>
  <Footer />
</div>

  );
}

export default App;
