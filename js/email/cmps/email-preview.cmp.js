'use strict'
export default {
    props: ['email'],
    template: `
    <li class="email-container">
        <img src="img/open.png" v-if="email.isRead">
        <img src="img/close.png" v-else>
        <div>
            <h1>{{email.subject}}</h1>
            <p>{{email.body.slice(0,30)}}</p>
        </div>
 
    </li>
    `,

}