// Alurnya adalah jika tidak ada list, kita tambahkan <p> untuk menunjukkan bahwa kosong dalam fungsi checkIsEmpty
// Lalu ketika user click submit dan tidak ada input, akan di return kosong dan tidak ada yang ditambah
// Ketika ada input dan user click submit, baru akan dibuat newTodo dan di append ke dalam unordered list htmlnya
// User bisa click list agar mencentang atau cancel todonya
// User juga bisa click delete dan listnya akan di delete

// Saat semua html dan image sudah load, jalankan fungsi
$(window).on("load", function() {
    // Dibuat variable untuk input, submit, dan list
    let input = $(".input"),
        submit = $(".submit"),
        list = $(".list");

    // Fungsi untuk mengecek jika list kosong menggunakan length === 0
    function checkIsEmpty() {
        if ($(".list li").length === 0) {
            // Jika masih kosonsg, maka tambahkan paragraf ini
            list.append('<p class="empty">Nothing to do :)</p>');
        } else {
            // jika tidak kosong, hilangkan paragraf di atas jika ada
            $(".empty").remove();
        }
    }

    function addTodo(todo) {
        if (!todo) return
        // Jika input kosong menggunakan !todo, maka return kosong dan tidak dilanjutkan

        // Jika ada input, maka dibuatlah newTodo dengan htmlnya
        let newTodo = `<li>
        <div class="todo">
            <input type="checkbox" id=${Date.now()}>
            <label for=${Date.now()}>${todo}</label>
        </div>
        <button class="delete">
            <img src="trash.png" alt="Delete">
        </button>
        </li>`

        // Lalu ditambahkan ke dalam list
        list.append(newTodo)

        // checkIsEmpty untuk menghapus paragraf nothing to do
        checkIsEmpty()
    }

    submit.on("click", function(e) {
        // Setiap onclick, prevent default dan coba untuk menjalankan fungsi addTodo dengan valuenya yaitu input.val()
        e.preventDefault()
        addTodo(input.val())
        // Jika sukses, maka kosongkan lagi inputnya
        input.val("")
    })

    list.on("click", ".delete", function() {
        // Jika sebuah list di click yang dalamnya mempunyai class "delete",
        // maka hapuskan listnya
        $(this).parent().remove();

        // lalu jalankan checkIsEmpty untuk update jika perlu
        checkIsEmpty()
    })

    // Jalankan checkIsEmpty di awal untuk menambahkan paragraf bahwa kosong
    checkIsEmpty()

})