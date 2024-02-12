export default class StickyAPI{
    static getNotes(){
        if(!localStorage.getItem("sticky__notes")){
            localStorage.setItem("sticky__notes", JSON.stringify([
                {
                    id: Math.floor(Math.random()*1000000),
                    note: "This is a sample note, you can click to edit",
                    updated: new Date().toISOString()
                }
            ]))
        }
        const stickyNotes = JSON.parse(localStorage.getItem("sticky__notes"));
        return stickyNotes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1
        })
    }
    static saveNotes(note){
        const notes = StickyAPI.getNotes()
        const noteExists = notes.find(stickynote => stickynote.id == note.id)
        if(noteExists){
            noteExists.note = note.note;
            noteExists.updated = new Date().toISOString()
        }else{
            note.updated = new Date().toISOString()
            notes.push(note)
        }
        notes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1
        })
        localStorage.setItem("sticky__notes",JSON.stringify(notes))
    }
    static deleteNote(id){
        const notes = StickyAPI.getNotes();
        const newNotes = [];

        notes.forEach(note =>{
            if(note.id != id){
                newNotes.push(note)
            }
        })
        localStorage.setItem("sticky__notes",JSON.stringify(newNotes))

    }
}