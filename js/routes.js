'use strict'
import appsusApp from './pages/appSus-app.cmp.js'



const routes = [
    { path: '/', component: appsusApp },
];


Vue.use(VueRouter);
var myRouter = new VueRouter({routes})


export default myRouter
