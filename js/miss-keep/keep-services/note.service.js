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
            // console.log('note.title',note.title);
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
    return [_createInitialNote(), _createInitialList(), _createInitialImg()];
}


function _createInitialNote() {
    return {
        id: utilService.makeId(),
        title: utilService.makeLorem(3),
        body: utilService.makeLorem(40),
        item: '',
        bgc: { backgroundColor: randomColors() },
        tasks: [],

    }

}

function  _createInitialList(){
    return{
        id: utilService.makeId(),
        title: '',
        // body: '',
        item: '',
        bgc: { backgroundColor: randomColors() },
        tasks: [{text:'Go to the mall'}, {text:'Bake cookies'} , {text:'Watch Netflix'}],
    }
}

function _createInitialImg(){
    return{
        id: utilService.makeId(),
        title: 'Change netflix avatar, to this: ',
        body: '',
        item: {imageSrc: './img/0.jpg'},
        bgc: { backgroundColor: randomColors() },
        tasks: [],

    }
}



function randomColors() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';

}



export default {
    query,
    getById,
    deleteNote,
    saveNote
}