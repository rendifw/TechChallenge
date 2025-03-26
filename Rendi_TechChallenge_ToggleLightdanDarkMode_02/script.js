

$(function() {
    let button = $("#theme");
    let body = $("body");
    button.on("click", function() {
        body.toggleClass("dark light");
    })
})