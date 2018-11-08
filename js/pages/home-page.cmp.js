'use strict'


export default {
    template:`
    <section class="home-page-container">
        <!-- <h1>Welcome!</h1> -->
        <div class="horse-move">
            <div class="move-div">
                <img class="run-horse" src="img/run.gif" alt="">
                <span class="home-page-title">welcome</span>
            </div>
        </div>
            <router-link tag="button" class="email-link" to="/email">Email App</router-link>
            <router-link tag="button" class="keep-link" to="/keep">Keep App</router-link>
    </section>
    `
}

