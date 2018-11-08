export default {
    template:`
    <section class="note-filter">
        
        <input type="text" v-model="filter.byTitle" @input="emitFilter" placeholder="Search your Note"/>
    </section>
    `,
    data() {
        return {
            filter: {byTitle: '',
                     byColor:''}
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        },
        sameColor(){
            if(this.filter.byColor===filter.byTitle) return this.$emit('filtered, this.filter')
        }
    }
}