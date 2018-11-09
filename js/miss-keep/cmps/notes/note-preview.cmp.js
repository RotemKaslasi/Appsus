


export default {
    props: ['note'],
    template: `
            <li class="note-list-container" :style="note.bgc" :class="{'is-image': note.item}" >
             
                <div v-if="note.tasks.length>0" v-for="task in note.tasks">
                        <h3>{{task.text}}</h3>   
                </div>
                <h2>
                    <router-link :to="noteDetailsLink">{{note.title}}</router-link>
                </h2>

                <h3 v-if="note.body">{{note.body}}</h3>
                    <div v-if="note.item" >
                        <img :src="note.item.imageSrc" style="width:100%" >
                    </div>
                
                <router-link :to="'/note/'+note.id"><i class="fas fa-trash-alt"></i></router-link> |
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



