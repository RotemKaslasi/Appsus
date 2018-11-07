'use strict'

export default {
    template: `
        <section class="fliter-container" @keyup.enter="setFilter"> 
        <div>
        <span>Filter:</span>
        <input type="text" v-model="filter.txt" />
        </div>
        <div>
        <input type="radio" value="all" v-model="filter.emailStatus"> ALL
        <input type="radio" value="read" v-model="filter.emailStatus"> Read
        <input type="radio" value="unread" v-model="filter.emailStatus"> Unread
        </div>
        </section>
    `,
    data() {
        return {
            filter: {
                txt: null,
                emailStatus: 'all'

            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('set-filter', this.filter)
            this.filter = {
                txt: null,
                emailStatus: this.filter.emailStatus
            }
        }
    }
}