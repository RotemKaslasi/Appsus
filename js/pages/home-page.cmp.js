'use strict'


export default {
    template:`
    <section class="home-page-container">
        <!-- <h1>Welcome!</h1> -->
        <!-- <div class="horse-move">
            <div class="move-div">
                <img class="run-horse" src="img/run.gif" alt="">
                <span class="home-page-title">welcome , choose your app</span>
            </div>
        </div> -->
            <router-link tag="button" class="email-link" to="/email">
                <img src="img/email.png" alt="" srcset="">
            </router-link>
            <router-link tag="button" class="keep-link" to="/keep">
                <img src="img/notes.png" alt="" srcset="">
            </router-link>
    </section>
    `
}

