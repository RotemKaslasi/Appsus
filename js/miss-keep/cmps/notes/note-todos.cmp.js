import noteService from '../../keep-services/note.service.js'

export default {
    props: ['tasksList'],

    template: `
     <div class="container" id="todo">
			
			<section class="panel">	

				<input type="checkbox" id="mark-all" @click="selectAll" :checked="areAllSelected">
                <input v-model="newTask"   @keyup.enter="addTask" placeholder="What do you need to do?" autofocus class="text-input" onsubmit="return false">

                <button @click="addTask">Add task</button>
                <button @click="clearList">Clear List</button>
                <button @click="saveNote">SAVE<form @submit.prevent="saveNote"></form></button>
                

			</section>

			<section class="list"  v-if="tasksList.length">
				<ul class="list-item">

					<li v-for="task in tasks" :class="{done: isChecked(task)}">

						<input type="checkbox" class="checkbox" @click="check" v-model="task.checked">
						
						<input type="text" v-if="task === editingTask" v-auto-focus class="text-input" @keyup.enter="endEditing(task)" @blur="endEditing(task)" v-model="task.text">

						<label for="checkbox" v-if="task !== editingTask" @dblclick="editTask(task)">{{ task.text }}</label>
						
						<button class="delete" @click="removeTask(task)">X</button>
					</li>
				</ul>
			</section>

	</div>
    `,

    data() {
        return {
            newTask: "",
            tasks: this.tasksList,
            editingTask: {

            },
            data: null
        }
    },

    computed: {
        areAllSelected: function () {
            return this.tasks.every(function (task) {
                return task.checked;
            }) && this.tasks.length > 0;
        },
    },

    methods: {

        addTask() {
            var task = this.newTask.trim();
            if (task) {
                this.tasks.push({ text: task, checked: false });
                this.newTask = "";
            }
        },

        removeTask(task) {
            var index = this.tasks.indexOf(task);
            this.tasks.splice(index, 1);
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
            this.tasks = [

            ];
        },

        selectAll(task) {
            var targetValue = this.areAllSelected ? false : true;
            for (var i = 0; i < this.tasks.length; i++) {
                this.tasks[i].checked = targetValue;
            }
        },

        check(task) {
            task.checked = true;
        },

        isChecked(task) {
            return task.checked;
        },

        saveNote() {
            // console.log('Saved!', this.tasks);
            this.$emit('save', { tasks: this.tasks })
        }



    }
};

