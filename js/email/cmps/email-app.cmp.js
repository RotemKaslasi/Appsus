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
        <select class="sort-emails" @change="sortEmails" v-model="sortBy">
            <option value="date">Date</option>
            <option value="title">Title</option>
        </select>
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
            isSearchEmail: false,
            sortBy: 'date'
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
        },
    },
    methods: {
        loadStatus() {
            servicesEmail.getEmailStatus().then(status => {
                this.status = status;
            })
        },
        loadEmails() {
            servicesEmail.query().then(emails => {
                this.emails = emails;
            })
        },
        setFilter(filter) {
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
                this.loadEmails();
                this.loadStatus();
            })
        },
        closeNew() {
            this.isAddEmail = false;
        },
        sortEmails() {
            console.log(this.sortBy);
            if (this.sortBy === 'date') this.emails.sort(this.sortByDate);
            else this.emails.sort(this.sortByTitle);
        },
        sortByDate(emailA, emailB) {
            return emailB.sendAt - emailA.sendAt
        },
        sortByTitle(emailA, emailB) {
            if (emailA.subject < emailB.subject)
                return -1;
            if (emailA.subject > emailB.subject)
                return 1;
            return 0;
        },
    },
    created() {
        this.loadEmails()
        eventBus.$on(DELETED_EMAIL, (email) => {
            servicesEmail.deleteEmail(email.id).then(() => {
                this.loadEmails();
                this.loadStatus();
            })
        })
        this.loadStatus();
        this.sortEmails();
    },
    components: {
        emailList,
        emailStatus,
        emailFilter,
        emailCompose
    }
}