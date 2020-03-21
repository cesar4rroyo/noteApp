import React, { Component } from "react";
import "./App.css";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import firebase from "firebase";
import "firebase/database";
import { DB_CONFIG } from "./config.js";

class App extends Component {
    constructor() {
        super();
        this.state = {
            notes: [
                // { noteId: 1, noteContent: "nota1" },
                // { noteId: 2, noteContent: "nota2" }
            ],
            loading: false
        };

        this.app = firebase.initializeApp(DB_CONFIG);
        this.db = this.app
            .database()
            .ref()
            .child("notes");

        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
    }

    componentDidMount() {
        const { notes } = this.state;
        this.setState({ loader: true });
        this.db.on("child_added", snap => {
            notes.push({
                noteId: snap.key,
                noteContent: snap.val().noteContent
            });
            this.setState({ notes });
            this.setState({ loader: false });
        });

        this.db.on("child_removed", snap => {
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].noteId === snap.key) {
                    notes.splice(i, 1);
                }
            }
            this.setState({ notes });
        });
    }

    addNote(note) {
        // let { notes } = this.state;
        // notes.push({
        //     noteId: notes.length + 1,
        //     noteContent: note
        // });
        // this.setState({ notes });
        this.db.push().set({
            noteContent: note
        });
    }

    removeNote(noteId) {
        this.db.child(noteId).remove();
    }

    render() {
        return (
            <div className="note-app">
                <div className="header">
                    <nav className="navbar navbar-light bg-light">
                        <a
                            className="navbar-brand"
                            href="https://cesar4rroyo.github.io/myPortfolio/"
                        >
                            <img
                                src="icon.png"
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                alt=""
                            />
                            React and Firebase project
                        </a>
                    </nav>
                </div>
                <div className="footer">
                    <NoteForm addNote={this.addNote} />
                </div>
                <div className="container">
                    {this.state.notes.map(note => {
                        return (
                            <Note
                                noteContent={note.noteContent}
                                noteId={note.noteId}
                                key={note.noteId}
                                deleteNote={this.removeNote}
                                number={this.state.notes.length}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default App;
