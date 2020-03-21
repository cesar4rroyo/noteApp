import React, { Component } from "react";
import "../App.css";

class NoteForm extends Component {
    constructor() {
        super();
        this.addNote = this.addNote.bind(this);
    }

    addNote() {
        console.log(this.textInput.value);
        this.props.addNote(this.textInput.value);
        this.textInput.value = "";
        this.textInput.focus();
    }

    render() {
        return (
            <div className="container">
                <div className="input-group input-group-lg">
                    <textarea
                        ref={input => {
                            this.textInput = input;
                        }}
                        type="text"
                        className="form-control"
                        placeholder="What do you think today?..."
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                    />
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.addNote}
                    >
                        Add Note
                    </button>
                </div>
            </div>
        );
    }
}
export default NoteForm;
