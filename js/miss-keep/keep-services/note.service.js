import storageService from '../../services/storage.service.js'
import utilService from '../../services/util.service.js'


function saveNote(note) {
    return storageService.load(KEY)
        .then(notes => {
            // Update
            if (note.id) {
                var noteIdx = notes.findIndex(currNote => currNote.id === note.id)
                notes.splice(noteIdx, 1, note);
            } else {
                // Add
                note.id = utilService.makeId();
                notes.push(note);
            }
            return storageService.store(KEY, notes);
        });
}

function deleteNote(noteId) {
    return storageService.load(KEY)
        .then(notes => {
            var noteIdx = notes.findIndex(note => note.id === noteId);
            notes.splice(noteIdx, 1);
            return storageService.store(KEY, notes);
        })
}


function getById(noteId) {
    return storageService.load(KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId);
        })
}



export default {
    // query,
    getById,
    deleteNote,
    saveNote
}