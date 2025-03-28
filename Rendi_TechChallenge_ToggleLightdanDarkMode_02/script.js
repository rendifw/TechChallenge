
// Alurnya adalah toggle class body yang dark menjadi light, dan light menjadi dark
// Lalu sisa logikanya ada di css yang menggunakan css variables

// Saat semua html dan image sudah load, jalankan fungsi
$(window).on("load", function() {
    // Membuat variable untuk target tombol dan body
    // Body akan diganti classnya
    let button = $("#theme");
    let body = $("body");
    button.on("click", function() {
        // toggleClass digunakan untuk mengganti bolak-balik
        body.toggleClass("dark light");
    })
})