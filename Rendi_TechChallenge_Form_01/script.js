
$(function() {
    $(".toggle-password").on("click", function(){
        let input = $(this).prev();
        let newType = input.attr("type") === "password" ? "text" : "password";
        input.attr("type", newType)

        let newIcon = $(this).attr("src").includes("Eye.svg") ? "EyeSlash.svg" : "Eye.svg"; 
        let newAlt = newIcon.includes("Eye.svg") ? "Hide Password" : "Show Password";

        $(this).attr("src", newIcon)
        $(this).attr("alt", newAlt)
    })
    
    function validateForm() {
        let emptyError = "Field is required!"
        let fullName = $("#full-name").val()
        let email = $("#email").val()
        let password = $("#password").val()
        let confirm = $("#confirm-password").val()

        $(".error-name, .error-email, .error-gender, .error-password, .error-confirm").html("");

        if (fullName === "") $(".error-name").html(emptyError)
        if (email === "") $(".error-email").html(emptyError)
        if ($('input[type="radio"]:checked').length == 0) $(".error-gender").html("Pick a gender!")
        if (password === "") $(".error-password").html(emptyError)
        
        if (confirm === "") {
            $(".error-confirm").html(emptyError)
        } else if (confirm !== password) {
            $(".error-confirm").html("Wrong confirm password!")
        }
        
        $("#full-name, #email, #password, #confirm-password").on("keyup", validateForm);
        $("input[type='radio']").on("change", validateForm)


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


    $(".submit").on("click", function(e) {
        e.preventDefault();
        if(validateForm()) {
            
            let data = {
                fullName: $("#full-name").val(),
                email:    $("#email").val(),
                gender:   $("input[name='gender']:checked").val(),
                password: $("#password").val(),
                confirm:  $("#confirm-password").val()
            };

            
            console.log(data)

            $(".form-container").append('<div class="success-popup"><p>Sign Up Successful!</p><small>click for next page</small></div>')
            $(".success-popup").on("click", function() {$(this).hide()})

            $("#full-name, #email, #password, #confirm-password").val("");

            $("input[name='gender']").prop("checked", false);

            $(".form-container").css("border-color", "var(--dark-blue)");
        }

    })
})