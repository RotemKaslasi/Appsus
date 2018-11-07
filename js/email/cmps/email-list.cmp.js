'uee strict'
import emailPreview from './email-preview.cmp.js'
export default {
    props: ['emails'],
    template: `
    <section class="email-list-container">
        <ul class="email-list">
            <email-preview  v-for="email in emails" @click.native="emailSelected(email)" :email="email"></email-preview>
        </ul>
    </section>
    `,
    methods: {
        emailSelected(email) {
            this.$emit('emailSelected', email)
        }
    },
    components: {
        emailPreview
    }
}