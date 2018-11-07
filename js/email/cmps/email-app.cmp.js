'use strict'
import servicesEmail from '../services.email.js'
import emailList from './email-list.cmp.js'
import emailDetails from './email-details.cmp.js'

export default {
    template: `
    <section class="email-app-container">
            <email-list :emails="emails"></email-list>
            <!-- <email-details :email="emailSelect"></email-details> -->
    </section>
    `,
    data() {
        return {
            emails: [],
        }
    },
    methods: {
        loadEmails() {
            servicesEmail.query().then(emails => {
                this.emails = emails;
            })
        }
    },
    created() {
        this.loadEmails()

    },
    components: {
        emailList,
    }
}