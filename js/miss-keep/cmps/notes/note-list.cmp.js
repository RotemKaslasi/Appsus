import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="notes-list-container">
                <ul class="notes-list">
                <note-preview v-for="note in notes" :note="note" >
                    <!-- <router-link :to="'/note/'+note.id">Details</router-link> | -->
                    <!-- <router-link :to="'/note/edit/'+note.id">Edit</router-link> -->
                </note-preview>
                  
                </ul>              
        </section>
    `,
    methods:{
        alertDelete(){
            this.$emit('noteDeleted');
        }
    },


    components: {
        notePreview
    }

}
