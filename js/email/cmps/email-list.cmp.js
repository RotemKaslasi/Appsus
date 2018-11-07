'uee strict'
import emailPreview from './email-preview.cmp.js'
export default {
    props: ['emails'],
    template: `
    <section class="email-list-container">
        <ul class="email-list">
            <email-preview v-for="email in emails" :email="email"></email-preview>
        </ul>
    </section>
    `,
    components:{
        emailPreview
    }
}