

$(function() {
    let input = $(".input"),
        submit = $(".submit"),
        list = $(".list");

    function checkIsEmpty() {
        if ($(".list li").length === 0) {
            list.append('<p class="empty">Nothing to do :)</p>');
        } else {
            $(".empty").remove();
        }
    }

    function addTodo(todo) {
        if (!todo) return

        let newTodo = `<li>
        <div class="todo">
            <input type="checkbox" id=${Date.now()}>
            <label for=${Date.now()}>${todo}</label>
        </div>
        <button class="delete">
            <img src="trash.png" alt="Delete">
        </button>
        </li>`
        list.append(newTodo)
        checkIsEmpty()
    }
    submit.on("click", function(e) {
        e.preventDefault()
        addTodo(input.val())
        input.val("")
    })

    list.on("click", ".delete", function() {
        $(this).parent().remove();
        checkIsEmpty()
    })
    checkIsEmpty()

})