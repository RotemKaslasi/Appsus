


export default {
    props: ['note'],
    template: `
            <li class="note-list-container" :style="note.bgc">
                <div v-if="Array.isArray(note.tasks)" v-for="task in note.tasks">
                        <h3>{{task.text}}</h3>   
                </div>
                <h2>
                    <router-link :to="noteDetailsLink">{{note.title}}</router-link>
                </h2>

                <h3 v-if="note.body">{{note.body}}</h3>

                    <div v-if="note.item">
                        <img :src="note.item.imageSrc">
                    </div>
                
                <router-link :to="'/note/'+note.id">Details</router-link> |
                <router-link :to="'/note/edit/'+note.id">Edit</router-link>
            </li> 
    
    `,
    data() {
        return {
            toDelete: false
        }
    },
    created() {
        console.log('note-Preview was created!', this.note);
    },

    computed: {
        noteDetailsLink() {
            return `/note/${this.note.id}`;
        },
    }



}



