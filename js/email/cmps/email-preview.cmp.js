'use strict'
import eventBus, { EMAIL_SELECTED } from '../../services/event-bus.service.js'
export default {
    props: ['email'],
    template: `
            <li class="email-container" :class="readClass">
                <img src="img/open.png" v-if="email.isRead">
                <img src="img/close.png" v-else>
                <div class="email-text">
                    <h1>{{email.subject}}</h1>
                    <p>{{email.body.slice(0,100)}}...</p>
                    <p>{{new Date(email.sendAt).toGMTString()}}</p>
                </div>
                <button class="delete-email-btn" @click.stop="deleteEmail">
                    <img class="delete-email-img" src="img/email-delete.png" alt="" srcset="">
                </button>
            </li>
    `,
    methods: {
        emailReaded() {
            this.email.isRead = true;
        },
        deleteEmail(ev){
            ev.stopPropagation();
            console.log('delete')
        }
    },
    computed: {
        readClass() {
            return {
                'read': this.email.isRead,
                'un-read': !this.email.isRead
            }
        },
        emailDetailsLink() {
            return `/email/${this.email.id}`
        }
    }


}