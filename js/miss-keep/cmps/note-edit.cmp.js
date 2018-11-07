import noteService from '../keep-services/note.service.js'


export default {
    template:`
    <section class="note-edit">
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote">
            <input id="changeTitle" type="text" v-model="note.title" ><br>
            <textarea id="text-area" type="text" v-model="note.body" rows="4" cols="50">Enter your note </textarea><br>
            <button type="submit" > {{(note.id)? 'Save': 'Add'}}</button>
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
            // console.log(this.note);
            noteService.saveNote(this.note)
            .then(()=>{
                console.log('Saved!');
                this.$router.push('/keep');
            })
        }
    }
}