import servicesNote from '../keep-services/note.service.js'
import noteList from './notes/note-list.cmp.js'
import note from '../pages/note.js'
import noteFilter from '../cmps/notes/note-filter.cmp.js'
// import noteDetails from '../note-details.cmp.js'


export default {
    template: `
    <section class="note-app-container">
                <h1 class="notes-app-title">Notes App</h1>
                <button class="newNoteBtn"><router-link to="/note/edit">New Note</router-link></button>
                <note-filter @filtered="setFilter"></note-filter>
     
            <note-list :notes="notes"></note-list>
            
    </section>
    `,

// <note-details></note-details>
    

    data() {
        return {
            notes: [],
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
        }
    },
    created() {
        this.loadNotes()

    },
    components:{
        noteList,
        note,
        noteFilter
        // noteDetails
    }
}
