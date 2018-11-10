'use strict'


export default {
    template:`
    <section class="home-page-container">
            <router-link tag="button" class="email-link" to="/email">
            <img src="img/email.png" alt="" srcset="">
            <h1>Email</h1>
            </router-link>
            <router-link tag="button" class="keep-link" to="/keep">
                <img src="img/notes.png" alt="" srcset="">
                <h1>Keep-Note</h1>
            </router-link>
    </section>
    `
}

