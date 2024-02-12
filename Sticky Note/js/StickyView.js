export default class StickyView{
    constructor(root,{onNoteAdd,onNoteEdit,onNoteDelete,onNoteSelect}={}){
        this.root = root
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.onNoteSelect = onNoteSelect;
        this.root.innerHTML = `<button id="addNote">+</button>`

        
        

    }
    createStickyNotes(id,note){

        const MAX_LENGTH = 80;
        
        return `
            <textarea class="note" data-sticky-id="${id}">${note.substring(0,MAX_LENGTH)}${note.length > MAX_LENGTH ? "...": ""}
            </textarea>
        `
        /* const stickynote = StickyAPI.getNotes()
        stickynote.forEach(note => {
            this.root.insertAdjacentHTML("beforeend",`
            
            `)
        }) */
        
    }

    updateNotesList(notes){
        this.root.innerHTML = `<button id="addNote">+</button>`
        for(let i = notes.length - 1;i >= 0;i--){
            const html = this.createStickyNotes(notes[i].id,notes[i].note);
            this.root.insertAdjacentHTML("afterBegin",html)
        }

        const noteslist = this.root.querySelectorAll(".note")
        noteslist.forEach(note => {
            note.addEventListener('keyup',(e)=>{
                if(e.key == "Enter"){
                    const newNote = note.value.trim()
                    this.onNoteSelect(note.dataset.stickyId)
                    this.onNoteEdit(newNote)
                    e.target.blur()
                }
            })
            note.addEventListener('dblclick',(e)=>{
                const shouldDelete = confirm("Are you sure you want to delete selected note?")
                if(shouldDelete){
                    this.onNoteDelete(note.dataset.stickyId)
                }
            })
        })
        const addNote = this.root.querySelector("#addNote")

        addNote.addEventListener("click", ()=>{
            this.onNoteAdd()
        })
        
    }
    
}