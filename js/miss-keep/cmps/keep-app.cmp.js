import servicesNote from '../keep-services/note.service.js'
import noteList from './notes/note-list.cmp.js'
// import noteDetails from '../note-details.cmp.js'


export default {
    template: `
    <section class="note-app-container">
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
        }
    },
    created() {
        this.loadNotes()

    },
    components:{
        noteList,
        // noteDetails
    }
}
