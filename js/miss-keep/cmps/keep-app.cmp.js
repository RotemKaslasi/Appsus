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
                <div class="app-header">
                <h1 class="notes-app-title">Notes App</h1>
                <note-filter @filtered="setFilter" ></note-filter>
                </div>
               
                <div class="btn-control">
                <button @click="txtChoose" id="newNoteBtn"><i class="far fa-sticky-note"></i> </button>
                <button @click="imageChoose" id="newNoteBtn"><i class="far fa-image"></i></button>
                <button @click="todoChoose" id="newNoteBtn"><i class="fas fa-check-square"></i></button>
                </div>

                

                <component  v-show="toToggle" v-if="nameCmp" :tasksList="tasks" :is="nameCmp" @save="saveNote" @newNoteAdded="loadNotes"></component> 
              
     
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
            tasks: [],
            toToggle: true,

            // isSearchNote=false
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
            if(this.nameCmp === 'noteEdit') this.toToggle = !this.toToggle;
            else this.nameCmp = 'noteEdit';
        },
        imageChoose() {
            if(this.nameCmp === 'noteImg') this.toToggle = !this.toToggle;
            else this.nameCmp = 'noteImg';
            
        },
        todoChoose() {
            if(this.nameCmp === 'noteTodo') this.toToggle = !this.toToggle;
            else this.nameCmp = 'noteTodo';
                

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
