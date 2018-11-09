'use strict'
export default {
    template: `
    <section class="add-email-container">
        <div class="new-email-container">
            <button class="close-add-btn" @click="closeAddNew"><i class="fas fa-angle-right"></i></button>
            <h1>New Email:</h1>
            <form class="form-container"  @submit="saveEmail">
                <div class="from-container">
                    <span>From</span>
                    <input type="text" class="from-input" v-model.trim="newEmail.from"/>
                </div>
                <div class="to-container">
                    <span>To</span>
                    <input type="text" class="to-input" v-model.trim="newEmail.to" />
                </div>
                <input type="text" class="subject-input" placeholder="Enter subject" v-model.trim="newEmail.subject"/>
                <textarea class="add-textarea" placeholder="Enter the body..." v-model="newEmail.body" cols="30" rows="10"></textarea>
                <button class="send-add-btn" :class="{'valid-send':isValid}" :disabled="!isValid">Send</button>
            </form>
        </div>
    </section>
    `,
    data() {
        return {
            newEmail: {
                body: null,
                subject: null,
                from: null,
                to: null
            }
        }
    },
    computed: {
        isValid() {
            return !!this.newEmail.body && !!this.newEmail.from && !!this.newEmail.to;
        }
    },
    methods: {
        saveEmail() {
            if (!this.newEmail.subject) this.newEmail.subject = 'non-subject'
            this.$emit('save-email', this.newEmail)
        },
        closeAddNew() {
            this.$emit('close-new');
        }
    }
}
