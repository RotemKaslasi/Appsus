import noteService from '../../keep-services/note.service.js'

export default {
    props: ['tasksList'],

    template: `
     <div class="container" id="todo" :style="note.bgc">
			
			<section class="panel note-edit">	

				<input type="checkbox" id="mark-all" @click="selectAll" :checked="areAllSelected">
                <input id="tasks-box" v-model="note.newTask" @keyup.enter="addTask" placeholder="What do you need to do?" autofocus class="text-input" onsubmit="return false">

                <button @click="addTask" class="todoBtn">Add task</button>
                <button @click="clearList" class="todoBtn">Clear List</button>
                <input type="color" v-model="note.bgc.backgroundColor"/>
                <button @click="saveNote" class="todoBtn">SAVE<form @submit.prevent="saveNote"></form></button>
                

			</section>

			<section class="list"  v-if="tasksList.length">
				<ul class="list-item">

					<li v-for="task in note.tasks" :class="{done: isChecked(task)}">

						<input type="checkbox" class="checkbox" @click="check" v-model="task.checked">
						
						<input type="text" v-if="task === note.editingTask" v-auto-focus class="text-input" @keyup.enter="endEditing(task)" @blur="endEditing(task)" v-model="task.text">

						<label for="checkbox" v-if="task !== note.editingTask" @dblclick="editTask(task)">{{ task.text }}</label>
						
						<button class="delete" @click="removeTask(task)">X</button>
					</li>
				</ul>
			</section>

	</div>
    `,

    data() {
        return {
            note:{
                newTask: "",
                tasks: this.tasksList,
                editingTask: {
                },
                bgc:{backgroundColor: 'lightyellow'},
                data: null
        }}
    },

    computed: {
        areAllSelected: function () {
            console.log(this.note)
            return this.note.tasks.every(function (task) {
                return task.checked;
            }) && this.note.tasks.length > 0;
        },
    },created(){
        console.log('tasklist here')
    },
    methods: {

        addTask() {
            var task = this.note.newTask.trim();
            if (task) {
                this.note.tasks.push({ text: task, checked: false });
                this.note.newTask = "";
            }
        },

        removeTask(task) {
            var index = this.note.tasks.indexOf(task);
            this.note.tasks.splice(index, 1);
        },

        editTask(task) {
            this.editingTask = task;
        },

        endEditing(task) {
            this.editingTask = {};
            if (task.text.trim() === "") {
                this.removeTask(task);
            }

        },

        clearList() {
            this.note.tasks = [

            ];
        },

        selectAll(task) {
            var targetValue = this.areAllSelected ? false : true;
            for (var i = 0; i < this.tasks.length; i++) {
                this.note.tasks[i].checked = targetValue;
            }
        },

        check(task) {
            task.checked = true;
        },

        isChecked(task) {
            return task.checked;
        },

        saveNote() {
            // console.log(this.note);
            noteService.saveNote(this.note)
                .then(() => {
                    console.log('Saved!');
                    this.$emit('newNoteAdded');
                    this.$router.push('/keep');
                })
        }



    }
};

