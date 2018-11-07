'use strict'
import appsusApp from './pages/appSus-app.cmp.js'


import router from './routes.js'

new Vue({
    el: "#app",
    router,
    components:{
        appsusApp
    }
})