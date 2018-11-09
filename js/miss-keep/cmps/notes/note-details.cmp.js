import noteService from '../../keep-services/note.service.js'
import busService, { USR_MSG_DISPLAY } from '../../../services/event-bus.service.js'


export default {

    template: `
        <section class="note-details-container" v-if="note">
        <div v-if="note.tasks.length>0" v-for="task in note.tasks" >      
                <h3>{{task.text}}</h3> 
        </div>
        <div  v-if="note.tasks.length === 0" class="note-details" :style="note.bgc">
                <h1>{{note.title}}</h1>
                <h4>{{note.body}}</h4>

                <div v-if="note.item.image">
                    <img :src="note.item.imageSrc">
                </div>
        </div>
                <button @click="deleteNote">Delete</button>
                <button @click="goBack">Go Back</button>
        </section>
    `,
    data() {
        return {
            note: null
        }
    },
    created() {
        const noteId = this.$route.params.noteId;
        if (noteId) {
            noteService.getById(noteId)
                .then(note => {
                    this.note = note
                })

        }
    },
    methods: {
        deleteNote() {
            noteService.deleteNote(this.note.id)
                .then(res => {
                    busService.$emit(USR_MSG_DISPLAY, { txt: `Your Note ${this.note.title} Deleted`, type: 'success' })
                    this.$router.push('/keep');
                })
        },

        goBack() {
            {
                this.$router.push('/keep')
            }
        }
    },
    components: {

    }
}