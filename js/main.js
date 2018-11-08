'use strict'
// import appsusApp from './pages/appSus-app.cmp.js'


import router from './routes.js'




new Vue({
    el: "#app",
    router,
    components: {
        // appsusApp
    },
    data: {
        isToggleMenu: false
    },
    methods: {
        openMenu() {
            console.log('open')
            this.isToggleMenu = !this.isToggleMenu;
        },
        closeMenu(){
            this.isToggleMenu = false;

        }
    },
    computed: {
        toggleMenu() {
            return {
                'close': !this.isToggleMenu,
                'open': this.isToggleMenu
            }
        }
    }
})