import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="notes-list-container">
                <ul class="notes-list">
                    
                <note-preview v-for="note in notes" v-show= "note.isPined" :note="note" ></note-preview>

                 <note-preview v-for="note in notes" v-show= "!note.isPined" :note="note" >
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
