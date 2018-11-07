import noteService from '../keep-services/note.service.js'
import noteList from '../cmps/notes/note-list.cmp.js'



export default {
    template: `
        <section class="note">
            <note-list :notes="notes"></note-list>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {
     
    },
    
    components: {
        noteList,
        
    }
}