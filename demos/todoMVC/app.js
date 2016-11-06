//localStorage persistance
var STORAGE_KEY = 'todos-vuejs-2.0'
var tdoStorage = {
    fetch(){
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        todos.forEach((todo,index) => {todo.id = index})
        todoStorage.uid = todos.length
        return todos
    },
    save(todos){
        localStorage.setItem(STORAGE_KEY,JSON.STRINGIFY(TODOS))
    }
}