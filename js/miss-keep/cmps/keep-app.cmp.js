import servicesNote from '../keep-services/note.service.js'
import noteList from './notes/note-list.cmp.js'
import note from '../pages/note.js'
import noteFilter from '../cmps/notes/note-filter.cmp.js'
import noteTodo from './notes/note-todos.cmp.js'
import noteEdit from './note-edit.cmp.js'
import noteImg from './note-img.cmp.js'


export default {
    template: `
    
    <section class="note-app-container">
                <h1 class="notes-app-title">Notes App</h1>
                <button @click="txtChoose" class="newNoteBtn">text note</button>
                <button @click="imageChoose" class="newNoteBtn">img note</button>
                <button @click="todoChoose" class="newNoteBtn">todo note</button>
                <note-filter @filtered="setFilter"></note-filter>

                <component v-if="nameCmp" :tasksList="tasks" :is="nameCmp" @save="saveNote" ></component> 
              
     
            <note-list :notes="notes"></note-list>
            
    </section>
    `,




    data() {
        return {
            notes: [],
            note: {
                image: false
            },
            nameCmp: null,
            tasks:[]
        }
    },
    methods: {
        loadNotes() {
            servicesNote.query().then(notes => {
                this.notes = notes;
            })
        },
        setFilter(filter) {
            servicesNote.query(filter)
                .then(notes => this.notes = notes)
        },
        saveNote(note) {
            servicesNote.saveNote(note);
            console.log('father saved', this.notes)
            this.loadNotes();
        },
        txtChoose() {
            this.nameCmp = 'noteEdit';
                  
        },
        imageChoose() {
            this.nameCmp = 'noteImg';
        },
        todoChoose() {
            this.nameCmp = 'noteTodo';
           
           
        },
    



    },
    created() {
        this.loadNotes()

    },
    components: {
        noteList,
        note,
        noteFilter,
        noteTodo,
        noteEdit,
        noteImg
    }
}
