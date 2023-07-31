const Statuses = {PLANE: 'План', DONE: 'Виконано', IN_PROGRESS: 'В процесі'}

class TODOItem {
    text; 
    status;
  
    constructor(text, status = Statuses.IN_PROGRESS) {
      this.text = text;
      this.status = status;
    }
  
}

String.prototype.format = function() {
  let formatted = this;
  for (let i = 0; i < arguments.length; i++) {
    let regexp = new RegExp('\\{'+i+'\\}', 'gi');
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};


document.addEventListener('DOMContentLoaded', function(){
    let todoList = [];

    let itemHtml = '<div class="todo-list-item" data-id="{0}">\
        <span class="todo-item" data-id="{3}">{4}</span>\
        <select name="" class="todo-select" data-id="{1}" value="{2}">\
            <option value="DONE">in progress</option>\
            <option value="IN_PROGRESS">done</option>\
            <option value="PLANE">plane</option>\
        </select>\
        <button class="delete-item-todo btn" data-id="{5}">Delete</button>\
    </div>'

    function drawTodoList() {
      let todoListBlock = document.getElementById("todo-list-block")
      let todoListHtml = "";

      for(const [key, item] of Object.entries(todoList)) {
        let todoItemHtml = itemHtml.format(key, key, item.status, key, item.text, key)
        todoListHtml = todoListHtml + todoItemHtml
      }
      todoListBlock.innerHTML = todoListHtml;

      let elements = document.getElementsByClassName("delete-item-todo");

        let deleteItemTodo = function() {
            let attribute = this.getAttribute("data-id");
            console.log(attribute)
            todoList.splice(attribute, 1)
            drawTodoList()
        };

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', deleteItemTodo, false);
        }
    }

    todoForm = document.getElementById("add_todo_item");
    todoForm.addEventListener("submit", function(event){
        event.preventDefault()
        let addTodoText = document.getElementById("add_todo_test")
        let todoItemObj = new TODOItem(text = addTodoText.value)
        todoList.push(todoItemObj)

        drawTodoList()
    });
})