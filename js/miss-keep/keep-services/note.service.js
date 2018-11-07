import storageService from '../../services/storage.service.js'
import utilService from '../../services/util.service.js'


const KEY = 'notesAppKey';

function query(filter = null) {
    return storageService.load(KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = _createInitialNotes();
                storageService.store(KEY, notes);
            }
            console.log('notes: ', notes);
            if (filter === null) return notes;
            else return notes.filter(note => 
                            note.title.toUpperCase().includes(filter.byTitle.toUpperCase()))
        })
}


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

function _createInitialNotes() {
    return [_createInitialNote(), _createInitialNote(), _createInitialNote(), _createInitialNote()];
}


function _createInitialNote() {
    return {
        id: utilService.makeId(),
        title: utilService.makeLorem(3),
        body: utilService.makeLorem(50),
        // isRead: false,
        
       
    }

}



export default {
    query,
    getById,
    deleteNote,
    saveNote
}