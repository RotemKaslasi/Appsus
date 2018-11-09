'use strict'
import servicesEmail from '../services.email.js'
import emailList from './email-list.cmp.js'
import emailStatus from './email-status.cmp.js'
import emailFilter from './email-filter.cmp.js'
import emailCompose from './email-compose.cmp.js'
import eventBus, { DELETED_EMAIL } from '../../services/event-bus.service.js'


export default {
    template: `
    <section class="email-app-container">
        <h1 class="email-top-title">Email App</h1>
        <div class="search-email">
            <email-filter :class="searchClass" @set-filter="setFilter"></email-filter>
            <button class="search-email-btn" @click="searchEmail">
                <img class="search-email-img" src="img/search.png" alt="" srcset="">
            </button>
        </div>
            <button class="add-email-btn" @click="addEmail">
                <img class="add-email-img" src="img/add-email.png" alt="" srcset="">
            </button>
            <div class="edit-email-container">
                <email-list  :emails="emailsForDisplay"></email-list>
                <email-compose  v-if="isAddEmail" @save-email="saveEmail" @close-new="closeNew"></email-compose>
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
            isAddEmail: false,
            isSearchEmail: false
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

        },
        searchClass() {
            return {
                'search-close': !this.isSearchEmail,
                'search-open': this.isSearchEmail
            }
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
            console.log('filter', this.filter)
            this.filter = filter;
        },
        addEmail() {
            this.isAddEmail = !this.isAddEmail;
        },
        searchEmail() {
            this.isSearchEmail = !this.isSearchEmail;
        },
        saveEmail(newEmail) {
            this.isAddEmail = false;
            console.log(newEmail)
            servicesEmail.saveEmail(newEmail).then(() => {
                this.loadEmails()
            })
        },
        closeNew() {
            this.isAddEmail = false;
        }
    },
    created() {
        this.loadEmails()
        this.getStatus()
        eventBus.$on(DELETED_EMAIL, (email) => {
            servicesEmail.deleteEmail(email.id).then(() => {
                this.loadEmails()
            })
        })

    },
    components: {
        emailList,
        emailStatus,
        emailFilter,
        emailCompose
    }
}