'use strict'
export default {
    template: `
    <section class="add-email-container">
        <h1>Create email:</h1>
        <form class="form-container"  @submit="saveEmail">
            <input type="text" placeholder="Enter subject" v-model.trim="newEmail.subject"/>
            <textarea v-model="newEmail.body" cols="30" rows="10"></textarea>
            <button :disabled="!isValid">Send</button>
        </form>
    </section>
    `,
    data() {
        return {
            newEmail: {
                body: null,
                subject: null
            }
        }
    },
    computed: {
        isValid() {
            return !!this.newEmail.body;
        }
    },
    methods: {
        saveEmail() {
            if (!this.newEmail.subject) this.newEmail.subject = 'non-subject'
            this.$emit('save-email', this.newEmail)
        }
    }
}

// id: utilService.makeId(),
// sendAt: utilService.getRandomInt(112000, 50000000),
// isRead: false,
// body: utilService.makeLorem(100),
// subject: utilService.makeLorem(3