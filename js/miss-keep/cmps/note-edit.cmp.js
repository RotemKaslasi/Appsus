import noteService from '../keep-services/note.service.js'
import noteImg from  '../cmps/note-img.cmp.js'
import todoList from '../cmps/notes/note-todos.cmp.js'

export default {
    template: `
    <section class="note-edit" v-bind:style="note.bgc">

       
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <div v-if="note.tasks.length > 0">
            <todo-list class="edit-list":tasksList="note.tasks" :noteId="note.id" :pined="note.isPined"></todo-list>
        </div>
        <div v-else>
        <button  class="to-pin-btn"  @click="setPin" :class="{'pined-note': note.isPined}"><i class="fas fa-thumbtack "></i></button>
        <form @submit.prevent="saveNote">
            <input id="changeTitle" type="text" v-model="note.title" ><br>
            <textarea id="text-area" type="text" v-model="note.body" rows="4" cols="30">Enter your note </textarea><br>

            <input type="color" value="note.bgc.backgroundColor" v-model="note.bgc.backgroundColor"/>
            <button type="submit" class="add-save" > {{(note.id)? 'Save': 'Add'}}</button>
            
            <img v-if=note.item.image :src="note.item.imageSrc" style="width:100%"/>
            <input v-if=note.item.image type="file" @change="onFileChanged">
            <button v-if=note.item.image @click="removeImage">Remove image</button>
        </form>     
        </div>  
    </section>
    `,

    data() {
        return {
            note: {
                title: '',
                body: '',
                item:{image:false, imageSrc:null},
                bgc:{backgroundColor: 'lightyellow'},
                todoOn: false, 
                tasks:[],
                isPined: false                 
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
        setPin(){
            this.note.isPined = !this.note.isPined;
            console.log ('is pined' , this.note.isPined)
        }
    },
    components:{
        noteImg,
        todoList
    }
}
