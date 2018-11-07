import noteService from '../keep-services/note.service'


export default {
    template:`
    <section class="note-edit">
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote">
            <input type="text" v-model="note.txt" >
            <button type="submit"> {{(note.id)? 'Save': 'Add'}}</button>
        </form>
    </section>
    `,

    data() {
        return {
            note: {
                title: '',
                body: ''
            }

        }
    },

    created() {
        const noteId  = this.$route.params.noteId;
        if (noteId) {
            noteService.getById(noteId)
            .then(note=>{
                this.note = note
            })
        }
    },
    methods: {
        saveNote() {
            console.log(this.note);
            noteService.saveNote(this.note)
            .then(()=>{
                console.log('Saved!');
                this.$router.push('/note');
            })
        }
    }
}