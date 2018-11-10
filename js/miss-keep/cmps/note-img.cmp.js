import noteService from '../keep-services/note.service.js'

export default {
    
    template: `
   
    <section class="note-edit" v-bind:style="note.bgc">
    <button class="to-pin-btn"  @click="setPin" :class="{'pined-note': note.isPined}"><i class="fas fa-thumbtack "></i></button>
        <h1>{{(note.id)? 'Edit Image': 'Add Image'}}</h1>
        <form @submit.prevent="saveNoteImg">
                <input id="changeTitle" type="text" v-model="note.title" ><br>
                <textarea id="text-area" placeholder="Enter somthing..." type="text" v-model="note.body" rows="4" cols="30" > 
                </textarea><br>
                <input type="color" v-model="note.bgc.backgroundColor"/>
                <button type="submit" class="img-btn" > {{(note.id)? 'Save': 'Add'}}</button>
        </form>

            <input type="file" @change="onFileChanged">
           
            <img :src="note.item.imageSrc" style="width:100% " />
            <button @click="removeImage" class="img-btn">Remove image</button>
            </div> 

    </section>
 
    `,
    data() {
        return {
            note: {
                title: '',
                body: '',
                bgc: { backgroundColor: '#FFFFFF' },
                item: {
                    image: false,
                    imageSrc: null,
                },
                selectedFile: null,
                tasks:[],
                isPined: false
                
            },
        }
    },
    created() {

    },
    methods: {
        onFileChanged() {
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
    }
}