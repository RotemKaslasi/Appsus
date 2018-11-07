'use strict'
import servicesEmail from '../services.email.js'
import emailList from './email-list.cmp.js'
import emailStatus from './email-status.cmp.js'
import emailFilter from './email-filter.cmp.js'
import emailCompose from './email-compose.cmp.js'

export default {
    template: `
    <section class="email-app-container">
            <email-filter @set-filter="setFilter"></email-filter>
            <div class="edit-email-container">
                <email-list  :emails="emailsForDisplay"></email-list>
                <email-compose  v-if="isAddEmail" @save-email="saveEmail"></email-compose>
                <button @click="addEmail">add</button>
            </div>
            <email-status :status="status"></email-status>
    </section>
    `,
    data() {
        return {
            emails: [],
            status: 0,
            filter: {
                txt: null,
                emailStatus: 'all'
            },
            isAddEmail: false
        }
    },
    computed: {
        emailsForDisplay() {
            if (!this.filter.txt && this.filter.emailStatus === 'all') return this.emails;
            if (this.filter.emailStatus === 'read') {
                return this.emails
                    .filter(email => email.isRead)
                    .filter(email => !this.filter.txt || email.subject.toLowerCase().includes(this.filter.txt.toLowerCase()))

            }
            if (this.filter.emailStatus === 'unread') {
                return this.emails
                    .filter(email => !email.isRead)
                    .filter(email => !this.filter.txt || email.subject.toLowerCase().includes(this.filter.txt.toLowerCase()))

            }
            console.log(this.emails)
            return this.emails
                .filter(email => 
                    !this.filter.txt || email.subject.toLowerCase().includes(this.filter.txt.toLowerCase()))

        }
    },
    methods: {
        getStatus() {
            servicesEmail.getEmailStatus().then(status => {
                this.status = status;
                console.log(this.status)
            })
        },
        loadEmails() {
            servicesEmail.query().then(emails => {
                this.emails = emails;
            })
        },
        setFilter(filter) {
            console.log('filter',this.filter)
            this.filter = filter;
        },
        addEmail() {
            this.isAddEmail = !this.isAddEmail;
        },
        saveEmail(newEmail) {
            servicesEmail.saveEmail(newEmail).then(() => {
                this.loadEmails()
            })
        }
    },
    created() {
        this.loadEmails()
        this.getStatus()

    },
    components: {
        emailList,
        emailStatus,
        emailFilter,
        emailCompose
    }
}