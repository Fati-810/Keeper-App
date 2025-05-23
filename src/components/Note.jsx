



import React, { useState } from "react";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content
  });

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditedNote(prev => ({ ...prev, [name]: value }));
  }

  function saveEdit() {
       console.log("Saving note:", editedNote);
    props.onEdit(props.id, editedNote);
    setIsEditing(false);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    }
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            name="title"
            value={editedNote.title}
            onChange={handleEditChange}
            onKeyPress={handleKeyPress}
            placeholder="Edit title"
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleEditChange}
            onKeyPress={handleKeyPress}
            placeholder="Edit content"
            rows="3"
          />
         <button onClick={saveEdit} type="button">✔</button>

        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
        <div className="note-buttons"> <button onClick={() => setIsEditing(true)}>Edit</button>
  <button onClick={() => props.onDelete(props.id)}>Delete</button>
 
</div>
        </>
      )}
    </div>
  );
}

export default Note;
