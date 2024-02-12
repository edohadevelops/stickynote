import StickyView from "./StickyView.js";
import StickyAPI from "./stickyAPI.js";

export default class App{
    constructor(root){
        this.notes = [];
        this.activenote = null;
        this.view = new StickyView(root,this._handlers())
        this._refreshNotes()
    }
    _refreshNotes(){
        const notes = StickyAPI.getNotes();
        this._setNotes(notes)

    }
    _setNotes(notes){
        this.notes = notes;
        this.view.updateNotesList(notes)
    }
    _setActiveNote(note){
        this.activenote = note
    }
    _updateNote(notes){

    }
    _handlers(){
        return {
            onNoteSelect: (id)=>{
                const activeNote = this.notes.find(entry=> entry.id = id)
                this._setActiveNote(activeNote)

            },
            onNoteAdd: ()=>{
                const newNote = {
                    id: Math.floor(Math.random()*10000000),
                    note: "New note"
                }
                StickyAPI.saveNotes(newNote)
                this._refreshNotes()
            },
            onNoteEdit: (note)=>{
                StickyAPI.saveNotes({
                    id: this.activenote.id,
                    note: note,
                })
                this._refreshNotes()
            },
            onNoteDelete: (id)=>{
                StickyAPI.deleteNote(id)
                this._refreshNotes()
            },
        }
    }
}