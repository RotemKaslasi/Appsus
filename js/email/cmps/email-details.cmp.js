'use strict'
import emailService from '../services.email.js'

export default {
    template: `
    <section class="details-container" v-if="email">
        <h1 class="subject-details">{{email.subject}}</h1> 
        <div class="details-info">
            <p class="to-details">
                <span>To</span>
                {{email.to}}
            </p> 
            <p class="from-details">
                <span>From</span>
                {{email.from}}
            </p> 
            <p class="time-details"> <span>At</span> {{new Date(email.sendAt).toGMTString()}}</p>
        </div>
        <p class="body-details">{{email.body}}</p>
        <button @click="backToList" class="close-details-btn"><i class="fas fa-angle-right"></i></button>
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




