'use strict'
import appsusApp from './pages/appSus-app.cmp.js'
import emailApp from './email/cmps/email-app.cmp.js'
import emailDetails from './email/cmps/email-details.cmp.js'
import keepApp from './miss-keep/cmps/keep-app.cmp.js'



const routes = [
    { path: '/', component: appsusApp },
    { path: '/email', component: emailApp },
    { path: '/email/:emailId', component: emailDetails },
    { path: '/keep', component: keepApp },
];


Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })


export default myRouter
