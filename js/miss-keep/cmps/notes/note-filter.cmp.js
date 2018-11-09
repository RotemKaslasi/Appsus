export default {
    template:`
    <section class="note-filter">        
        <input id="search-box" type="text" v-model="filter.byTitle" @input="emitFilter" placeholder="Search your Note"/>
        <img class="search-note-img" src="img/search.png" alt="" srcset=""> 
        
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