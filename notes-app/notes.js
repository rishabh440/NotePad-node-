const chalk = require('chalk')
const fs = require('fs')



const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) =>  note.title === title)
      
    debugger

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
} 
//read a note
const readNotes=(title)=>{
    const notes= loadNotes();
    const searchNote= notes.find((note)=>note.title=== title)
    if(searchNote){
        console.log(chalk.green.inverse(searchNote.title))
        console.log(chalk.green.inverse(searchNote.body))
    }else{
        console.log(chalk.red.inverse("Note not Found"));
    }
}


const removeNote= (title) =>{
    
    const notes= loadNotes();
    const notesToKeep= notes.filter((note)=> note.title !== title)

    if(notes.length>notesToKeep.length){
        console.log(chalk.green.inverse("Note Removed"))
    }else{
        console.log(chalk.red.inverse("Note not Found"));
    }
   saveNotes(notesToKeep);
   
}
const listNotes= (title)=>{
    const notes= loadNotes();
    console.log(chalk.green.inverse("Your Notes"));
  
    notes.forEach(note =>  console.log(note.title))
  
}

const saveNotes =  (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  ()=>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNotes: readNotes
}