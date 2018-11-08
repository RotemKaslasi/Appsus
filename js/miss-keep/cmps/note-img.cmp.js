export default {
    props: ['data'],
    template:`
            <div v-if="!data">
                 <h2>Select an image</h2>
                    <input type="file" @change="onFileChange(item, $event)">
            </div>
                <div v-else>
            <img :src="data" />
            <button @click="removeImage(item)">Remove image</button>
            </div>
 
    `,
    data() {
        return {
            item: {
                image: false
            },
        }
    },
    created(){
    
    },
    methods: {
        onFileChange(item, evevnt) {
            var files = event.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(item, files[0]);
        },
        createImage(item, file) {
            var image = new Image();
            var reader = new FileReader();

            reader.onload = (event) => {
                this.item.image = event.target.result;
                this.$emit('imgLoaded', item.image);
            };
            reader.readAsDataURL(file);
           
        },
        removeImage: function (item) {
            item.image = false;
            this.$emit('imgLoaded', item.image);
            // TODO: make pressing remove image to stay in same note
        },

}
}