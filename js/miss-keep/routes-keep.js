import home from './pages/home.js'
import note from './pages/note.js'
import noteDetails from '../miss-keep/cmps/notes/note-details.cmp.js'
import noteEdit from '../miss-keep/cmps/note-edit.cmp.js'


const routes = [
    {path: '/', component: home},
    {path: '/note', component: note},
    {path: '/note/edit/:noteId?', component: noteEdit},
    {path: '/note/:noteId', component: noteDetails},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;