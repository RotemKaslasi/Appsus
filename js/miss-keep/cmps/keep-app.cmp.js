import servicesNote from '../keep-services/note.service.js'
import noteList from './notes/note-list.cmp.js'
import note from '../pages/note.js'
import noteFilter from '../cmps/notes/note-filter.cmp.js'
import noteTodo from './notes/note-todos.cmp.js'
import noteEdit from './note-edit.cmp.js'
import noteImg from './note-img.cmp.js'

// import noteDetails from '../note-details.cmp.js'


export default {
    template: `
    <section class="note-app-container">
                <h1 class="notes-app-title">Notes App</h1>
                <button class="newNoteBtn">text note</button>
                <button class="newNoteBtn">img note</button>
                <button class="newNoteBtn">todo note</button>
                <note-filter @filtered="setFilter"></note-filter>

                <!-- <component is="noteTodo" :tasksList="notes" @save-todo="saveTodo"></component> -->
                <!-- <component is="noteEdit" ></component> -->
                <component is="noteImg" :data="item.image" ></component> 
                



                
                
                
     
            <note-list :notes="notes"></note-list>
            
    </section>
    `,

    // <note-details></note-details>


    data() {
        return {
            notes: [],
            item: {
                image: false
            },
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
        saveTodo(tasks) {
            servicesNote.saveNote(tasks);
            console.log('father saved',tasks)
            this.loadNotes();
        }
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
