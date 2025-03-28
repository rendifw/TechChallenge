
// Alurnya: ketika tombol submit di click, jalankan fungsi validateForm dan tampilkan error message jika ada
// Lalu setiap kali ada input yang ganti setelah pertama kali click submit, maka akan langsung di update error message menggunakan keyup dan on change
// Jika tidak ada error, maka munculkan popup setelah submit di click


// Saat semua html dan image sudah load, jalankan fungsi
$(window).on("load", function() {

    // Variable ini digunakan agar onkeyup dan onchange input hanya setelah pertama kali submit
    // Akan diganti menjadi true di on click tombol submitnya
    // Jadi tidak langsung ada error message saat pertama kali input
    let firstSubmit = false


    // Logic untuk toggle view password
    $(".toggle-password").on("click", function(){
        let input = $(this).prev();

        // Mengganti type="password" menjadi "text" dan sebaliknya
        let newType = input.attr("type") === "password" ? "text" : "password";
        input.attr("type", newType);

        // Mengganti icon saat diganti
        let newIcon = $(this).attr("src").includes("Eye.svg") ? "EyeSlash.svg" : "Eye.svg"; 
        let newAlt = newIcon.includes("Eye.svg") ? "Hide Password" : "Show Password";

        // Mengganti atributnya agar terlihat
        $(this).attr("src", newIcon)
        $(this).attr("alt", newAlt)
    })
    
    // fungsi ini dibikin pisah agar bisa mudah digunakan pada saat submit, on keyup, dan on change
    // validateForm dipanggil pertama kali saat form di submit
    function validateForm() {

        // Membuat variable text error yang akan ditampilkan saat input kosong dan
        // Membuat variable yang mengambil value dari input nama, email, password, dan confirm
        let emptyError = "Field is required!",
            fullName = $("#full-name").val(),
            email = $("#email").val(),
            password = $("#password").val(),
            confirm = $("#confirm-password").val();

        // Reset semua error message jika ada dulu, karena nanti akan ditambahkan kembali jika perlu
        $(".error-name, .error-email, .error-gender, .error-password, .error-confirm").html("");


        // Jika input kosong, akan ditampilkan error message kosong
        if (fullName === "") $(".error-name").html(emptyError)
        if (email === "") {
            $(".error-email").html(emptyError)
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // basic regex check email format
            $(".error-email").html("Email must be an email")
        }

        // Jika tidak ada radio button yang terpilih, akan ditampilkan error message kosong
        if ($('input[type="radio"]:checked').length == 0) $(".error-gender").html("Pick a gender!")
        
        // Jika password kosong atau kurang dari 8 karakter, akan ditampilan error message
        if (password === "") {
            $(".error-password").html(emptyError)
        } else if (password.length < 8 ) {
            $(".error-password").html("Password must be at least 8 characters!")
        }

        // Jika confirm password kosong atau tidak sama dengan password, akan ditampilkan error message
        if (confirm === "") {
            $(".error-confirm").html(emptyError)
        } else if (confirm !== password) {
            $(".error-confirm").html("Wrong confirm password!")
        }

        // Jika tidak ada error, akan mengganti border menjadi hijau untuk menunjukkan sukses dan return true
        // Jika ada error, akan mengganti border menjadi merah untuk menunjukkan fail dan return false
        if ($(".error-name").text() === "" &&
        $(".error-email").text() === "" &&
        $(".error-gender").text() === "" &&
        $(".error-password").text() === "" &&
        $(".error-confirm").text() === "") {
            $(".form-container").css("border-color", "green");
            return true
        } else {
            $(".form-container").css("border-color", "red"); 
            return false
        }
    }


    // Setiap tombol submit di click, preventDefault dan validasi form
    $(".submit").on("click", function(e) {
        e.preventDefault();
        firstSubmit = true;
        // Validasi form disini 
        if(validateForm()) {
            // Jika form return true, kumpulkan data dan console.log
            let data = {
                fullName: $("#full-name").val(),
                email:    $("#email").val(),
                gender:   $("input[name='gender']:checked").val(),
                password: $("#password").val(),
                confirm:  $("#confirm-password").val()
            };
            console.log(data)

            // Jiak form sukses, tambahkan popup sukses
            $(".form-container").append('<div class="success-popup"><p>Sign Up Successful!</p><small>click for next page</small></div>')
            
            // Saat popup dipencet, hilangkan popupnya
            $(".success-popup").on("click", function() {$(this).hide()})

            // Reset form input menjadi kosong lagi
            $("#full-name, #email, #password, #confirm-password").val("");
            $("input[name='gender']").prop("checked", false);

            // Balikkan warna border hijau menjadi biru lagi
            $(".form-container").css("border-color", "var(--dark-blue)");
        }

        // Setiap kali input diganti menggunakan keyup dan on change, akan dipanggil validateForm
        if (firstSubmit) {
            $("#full-name, #email, #password, #confirm-password").on("keyup", validateForm);
            $("input[type='radio']").on("change", validateForm)
        }
    })


})