export default {
    template:`
         <input type="file" @change="onFileChanged">
         <button @click="onUpload">Upload!</button>
    
    `,
    data() {
        return {
            selectedFile: null
        }
    },
    methods: {
        onFileChanged (event) {
          const file = event.target.files[0]
        },
        onUpload() {
          // upload file
        }
}
}