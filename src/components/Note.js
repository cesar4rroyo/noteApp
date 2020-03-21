import React, { Component } from "react";
import "../App.css";

class Note extends Component {
    constructor(props) {
        super(props);
        this.noteId = props.noteId;
        this.noteContent = props.noteContent;
        this.noteDate = props.noteDate;
    }
    handleDelete(id) {
        // console.log(id);
        this.props.deleteNote(id);
    }

    render() {
        return (
            <div className="card mb-3 mt-3 mr-3 ml-3">
                <div className="card-header">Note</div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{this.noteContent}</p>
                    </blockquote>
                </div>
                <div className="btn_container">
                    <button
                        id="btn-cerrar"
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(this.noteId)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default Note;
