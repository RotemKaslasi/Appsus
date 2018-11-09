import noteService from '../keep-services/note.service.js'
import noteImg from  '../cmps/note-img.cmp.js'
import todoList from '../cmps/notes/note-todos.cmp.js'

export default {
    template: `
    <section class="note-edit" v-bind:style="note.bgc">
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <div v-if="note.tasks.length > 0">
            <todo-list :tasksList="note.tasks"></todo-list>
        </div>
        <div v-else>
        <form @submit.prevent="saveNote">
            <input id="changeTitle" type="text" v-model="note.title" ><br>
            <textarea id="text-area" type="text" v-model="note.body" rows="4" cols="30">Enter your note </textarea><br>

            <input type="color" v-model="note.bgc.backgroundColor"/>
            <button type="submit" > {{(note.id)? 'Save': 'Add'}}</button>
            
            <img v-if=note.item :src="note.item.imageSrc"/>
            <input v-if=note.item type="file" @change="onFileChanged">
            <button v-if=note.item @click="removeImage">Remove image</button>
        </form>     
        </div>  
    </section>
    `,

    data() {
        return {
            note: {
                title: '',
                body: '',
                image:false,
                bgc:{backgroundColor: 'lightyellow'},
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
                })}
    },
    methods: {
        saveNote() {
            console.log(this.note);
            noteService.saveNote(this.note)
                .then(() => {
                    console.log('Saved!');
                    this.$emit('newNoteAdded');
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
            
        }, onFileChanged() {
            this.note.item.image = true;
            var item = this.note.item;
            var selectedFile = event.target.files[0];
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                item.imageSrc = reader.result;
               
            }, false)
            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            }
        },
        saveNoteImg(){
            noteService.saveNote(this.note)
            .then(() => {
                console.log('Saved!');
                this.$emit('save', this.note)
               
            })
            
        },

        removeImage(){
            this.note.item ='';
           
        },
    },
    components:{
        noteImg,
        todoList
    }
}
