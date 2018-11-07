import noteService from '../../keep-services/note.service.js'
import busService, {USR_MSG_DISPLAY} from '../../../services/event-bus.service.js'


export default {

    template: `
        <section class="note-details-container">
            <div class="note-details">
            <h1>{{note.title}}</h1>
            <h4>{{note.body}}</h4>
            
            </div>
            
            <button @click="deleteNote">Delete</button>
            <button @click="goBack">Go Back</button>
        </section>
    `,
    data(){
        return {
            note: null
        }
    },
    created() {
        const noteId = this.$route.params.noteId;
        noteService.getById(noteId)
        .then(note => this.note = note)

    },
    methods: {
        deleteNote() {
            noteService.deleteNote(this.note.id)
            .then(res => {
                busService.$emit(USR_MSG_DISPLAY, {txt: `Your Note ${this.note.title} Deleted`, type:'success' })
                this.$router.push('/keep');
            })
        },

        goBack(){
             {
                this.$router.push('/keep')
            }
        }
    },
    components: {
        
    }
}