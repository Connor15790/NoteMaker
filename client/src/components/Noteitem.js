import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const convertToFormattedHTML = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    text = text.replace(/__(.*?)__/g, "<u>$1</u>");
    return text;
};

const Noteitem = (props) => {
    const { note, updateNote, mode } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const convertedDescription = convertToFormattedHTML(note.description);

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body card-bg-dark" style={{ backgroundColor: mode === 'dark' ? '#13466e' : 'white', color: mode === 'dark' ? 'white' : '#042743', border: "1px solid white", borderRadius: "10px", height: "230px" }}>
                    <h5 className="card-title"><u>{note.title}</u></h5>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: convertedDescription }}></p>
                    <p className="card-text"><b>Tag:</b> {note.tag}</p>
                    <p className="card-text" style={{ fontStyle: 'italic' }}>
                        {new Date(note.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })}
                    </p>
                    <i className="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => { deleteNote(note._id); props.showAlert("Note Successfully Deleted", "success"); }}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" style={{ cursor: "pointer" }} onClick={() => updateNote(note)}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem