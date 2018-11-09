'use strict'
import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import emailApp from './email/cmps/email-app.cmp.js'
import emailDetails from './email/cmps/email-details.cmp.js'
import keepApp from './miss-keep/cmps/keep-app.cmp.js'
import note from './miss-keep/pages/note.js'
import noteDetails from './miss-keep/cmps/notes/note-details.cmp.js'
import noteEdit from './miss-keep/cmps/note-edit.cmp.js'


const routes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutPage },
    { path: '/email', component: emailApp },
    { path: '/email/:emailId', component: emailDetails },
    { path: '/keep', component: keepApp },
    {path: '/note', component: note},
    {path: '/note/edit/:noteId?', component: noteEdit},
    {path: '/note/:noteId', component: noteDetails},
];


Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })


export default myRouter
