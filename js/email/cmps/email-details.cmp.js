'use strict'
import eventBus, { EMAIL_SELECTED } from '../../services/event-bus.service.js'
import emailService from '../services.email.js'

export default {
    template: `
    <section class="details-container" v-if="email">
        <h1>{{email.subject}}</h1>
        <p>{{new Date(email.sendAt).toGMTString()}}</p>
        <p>{{email.body}}</p>
        <button @click="backToList">back</button>
    </section>
    `,
    data() {
        return {
            email: [],
            readAt: null,
        }
    },
    methods: {
        getTime() {
            return this.readAt = new Date(email.sendAt)
        },
        loadEmailData() {
            const emailId = this.$route.params.emailId;
            emailService.getEmailById(emailId).then(email => {
                // if (book.feedbacks) this.reviews = book.feedbacks;
                this.email = email
                this.email.isRead = true;
                emailService.saveEmail(this.email)
            })

            // bookService.nextBook(bookId)
            //     .then(nextBook => this.nextBookId = nextBook.id)

            // bookService.prevBook(bookId)
            //     .then(prevBook => this.prevBookId = prevBook.id)
        },
        backToList() {
            this.$router.push('/email/')
        }
    },
    created() {
        console.log('created')
        this.loadEmailData();
    }
}




