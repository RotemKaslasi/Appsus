export default {
    template:`
    <section class="note-filter">
        <h3>Filter</h3>
        <input type="text" v-model="filter.byTitle" @input="emitFilter" placeholder="Search Note" />
    </section>
    `,
    data() {
        return {
            filter: {byTitle: ''}
        }
    },
    methods : {
        emitFilter() {
            this.$emit('filtered', this.filter)
        }
    }
}