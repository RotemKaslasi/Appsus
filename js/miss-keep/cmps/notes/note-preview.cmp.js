export default {
    props: ['note'],
    template: `
     <li class="note-list-container">
     <h2>
     <router-link :to="noteDetailsLink">{{note.title}}</router-link>
     </h2>
     <h3>{{note.body}}</h3>
     <router-link :to="'/note/'+note.id">Details</router-link> |
     <router-link :to="'/note/edit/'+note.id">Edit</router-link>
    </li> 
    
    `,
    created() {
        console.log('note-Preview was created!', this.note);
    },

    computed: {
        noteDetailsLink() {
            return `/note/${this.note.id}`;
        }
    }



}




   
