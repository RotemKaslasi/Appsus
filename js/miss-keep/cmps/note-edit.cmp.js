import noteService from '../keep-services/note.service.js'
import noteImg from  '../cmps/note-img.cmp.js'
import todoList from '../cmps/notes/note-todos.cmp.js'

export default {
    template: `
    <section class="note-edit" v-bind:style="note.bgc">
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote">
            <input id="changeTitle" type="text" v-model="note.title" ><br>
            <textarea id="text-area" type="text" v-model="note.body" rows="4" cols="50">Enter your note </textarea><br>

            <!-- <note-img @imgLoaded="setImage" :data="note.image"></note-img> -->

        <input type="color" v-model="note.bgc.backgroundColor"/>
            <button type="submit" > {{(note.id)? 'Save': 'Add'}}</button>
            
        </form>

        <!-- <button @click="openToDo">make to do happen</button>
            <todo-list v-show="note.todoOn" @TaskAdded="setTasks" :tasksList="note.tasks"></todo-list> -->
    </section>
    `,

    data() {
        return {
            note: {
                title: '',
                body: '',
                image:false,
                bgc:{backgroundColor: '#FFFFFF'},
                todoOn: false, 
                tasks:[]   
               
            },
        
        }
    },

    created() {
        const noteId = this.$route.params.noteId;
        if (noteId) {
            noteService.getById(noteId)
                .then(note => {
                    this.note = note
                    console.log(this.note.tasks)
                })

        }
    },
    methods: {
        saveNote() {
            // console.log(this.note);
            noteService.saveNote(this.note)
                .then(() => {
                    console.log('Saved!');
                    this.$router.push('/keep');
                })
        },
        setImage(imgPath){
           this.note.image = imgPath;
        },
        openToDo(){
            this.note.todoOn = !this.note.todoOn;
        },
        setTasks(tasksList){
            this.note.tasks = tasksList;
            
        }
    },
    components:{
        noteImg,
        todoList
    }
}
