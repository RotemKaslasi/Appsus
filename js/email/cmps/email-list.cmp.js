'uee strict'
import emailPreview from './email-preview.cmp.js'
export default {
    props: ['emails'],
    template: `
    <section class="email-list-container">
        <ul class="email-list">
            <email-preview   
                v-for="email in emails" 
                :email="email"
                @click.native="emailSelected(email)">
            </email-preview>
        </ul>
    </section>
    `,
    methods: {
        emailSelected(email) {
            console.log('email was selected')
            this.$router.push('/email/' + email.id)
        },
    },
    components: {
        emailPreview
    }
}