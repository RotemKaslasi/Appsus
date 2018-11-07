import noteList from '../cmps/notes/note-list.js'

export default {
    template: `
        <section class="note">
            <h1>Notes App</h1>
            <router-link to="/note/edit">New Note</router-link> 
            <note-list :notes="notes"></note-list>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {
        // setFilter(filter) {
        //     carService.query(filter)
        //     .then(cars => this.cars = cars)
        // }
    },
    
    components: {
        noteList,
        // carFilter
    }
}