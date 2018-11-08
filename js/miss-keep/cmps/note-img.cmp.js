export default {
    props: ['data'],
    template:`
   
    <section class="note-edit" v-bind:style="note.bgc">
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote">
                <input id="changeTitle" type="text" v-model="note.title" ><br>
                <textarea id="text-area" placeholder="Enter somthing..." type="text" v-model="note.body"  rows="4" cols="50" > 
                </textarea><br>

                <!-- <note-img  :data="note.image"></note-img> -->

            <input type="color"  v-model="note.bgc.backgroundColor"/>
            <button type="submit" > {{(note.id)? 'Save': 'Add'}}</button>
        </form>

            <div v-if="!data">
                 <h2>Select an image</h2>
                    <input type="file" @change="onFileChange(item, $event)">
            </div>
                <div v-else>
            <img :src="data" />
            <button @click="removeImage(item)">Remove image</button>
            </div>

    </section>
 
    `,
    data() {
        return {
            note: {
                title: '',
                body: '',
                bgc:{backgroundColor: '#FFFFFF'},
                item: {
                    image: false
                },   
            },
        }
    },
    created(){
    
    },
    methods: {
        onFileChange(item, evevnt) {
            var files = event.target.files || event.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(item, files[0]);
        },
        createImage(item, file) {
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (event) => {
                this.item.image = event.target.result;
                // this.$emit('imgLoaded', item.image);
                setImage(item.image)
            };
            reader.readAsDataURL(file);
           
        },
        removeImage: function (item) {
            item.image = false;
            this.$emit('imgLoaded', item.image);
            // TODO: make pressing remove image to stay in same note
        },
        setImage(imgPath){
            this.note.image = imgPath;
         },

}
}