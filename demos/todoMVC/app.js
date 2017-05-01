import Vue from '../../dist/vue';

const STORAGE_KEY = 'todos-vuejs-2.0';
const todoStorage = {
    fetch () {
        const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach((todo, index) => {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },
    save (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};

// visibility filters
const filters = {
    all (todos) {
        return todos;
    },
    active (todos) {
        return todos.filter(todo => !todo.completed);
    },
    completed (todos) {
        return todos.filter(todo => todo.completed);
    }
};

const app = new Vue({
    data: {
        todos: todoStorage.fetch(),
        newTodo: '',
        editedTodo: null,
        visibility: 'all'
    },

    // watch todos change for localStorage presistence
    watch: {
        todos: {
            handler (todos) {
                todoStorage.save(todos);
            },
            deep: true
        }
    },

    // computed properties
    computed: {
        filteredTodos () {
            return filters[this.visibility](this.todos);
        },
        remaining () {
            return filters.active(this.todos).length;
        },
        allDone: {
            get () {
                return this.remaining === 0;
            },
            set (value) {
                this.todos.forEach((todo) => {
                    todo.completed = value;
                });
            }
        }
    },

    filters: {
        pluralize (n) {
            return n === 1 ? 'item' : 'items';
        }
    },

    // methods that implement data logic
    // note there is no DOM manipulation here at all
    methods: {
        addTodo () {
            const value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            });
            this.newTodo = '';
        },
        removeTodo (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        },
        editTodo (todo) {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },
        doneEdit (todo) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
        },
        cancelEdit (todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },
        removeCompleted () {
            this.todos = filters.active(this.todos);
        }
    },
    directives: {
        'todo-focus': function (el, value) {
            if (value) {
                el.focus();
            }
        }
    }
});

// 使用route来处理visibility的变化
function onHashChange () {
    const visibility = window.location.hash.replace(/#\/?/, '');
    if (filters[visibility]) {
        app.visibility = visibility;
    } else {
        window.location.hash = '';
        app.visibility = 'all';
    }
}

window.addEventListener('hashchange', onHashChange);
onHashChange();

app.$mount('.todoapp');
