// Alurnya adalah user click start, lalu setiap millisecond akan dipanggil updateTime yang akan mengganti html stopwatch
// Setelah start, user bisa clck stop atau lap
// Jika click stop, user bisa click reset untuk mengulang dari 0


// Saat semua html dan image sudah load, jalankan fungsi
$(window).on("load", function() {

    // List untuk store laps
    let lappedTimes = [];

    // variable dari tombol-tombol start, stop, lap, dan reset
    let Start = $(".start"),
        Stop = $(".stop"),
        Lap = $(".lap"),
        Reset = $(".reset");

    // variable untuk menunjukkan stopwatchnya 00:00:00 
    let stopwatch = $("#stopwatch");
    
    // variable untuk lap list yang awalnya kosong
    let lapList = $(".lap-list");

    // variable yang digunakan untuk logic stopwatch
    let startTime, prevTime, stopwatchInterval, elapsed; 
    let lappedTime, prevLappedTime;

    // formatTime dibuat dalam fungsi karena akan dipanggil pada saat update Stopwatch dan pada list, jadi tidak berantakan
    function formatTime(ms) {
        // Menggunakan variabel untuk store berapa jam, menit, detik, dan millisecond yang sudah berjalan
        let hours = Math.floor(ms / 3600000),
            minutes = Math.floor((ms % 3600000) / 60000),
            seconds = Math.floor((ms % 60000) / 1000),
            milliseconds = ms % 1000;
    
        // Menggunakan variable untuk store displaynya
        // Jika jam, menit, atau detik kurang dari 10 atau 1 digit, akan ditambahkan 0 didepannya agar display selalu dua digit seperti 09:02:01 daripada 9:2:1
        let displayHours = hours < 10 ? "0" + hours : hours,
            displayMinutes = minutes < 10 ? "0" + minutes : minutes,
            displaySeconds = seconds < 10 ? "0" + seconds : seconds,
            displayMilliseconds = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

        // return jam jika ada, lalu menit, detik dan millisecond
        return `${hours ? displayHours + " : " : ""}${displayMinutes} : ${displaySeconds} : ${displayMilliseconds}`;
    }

    function updateTime() {
        // endTime akan berubah menjadi waktu sekarang setiap millisecond
        let endTime = Date.now();
        // Lalu dikurangi dengan startTime dan ditambah dengan prevTime
        // prevTime didapatkan dari waktu yang di stop
        elapsed = endTime - startTime + (prevTime || 0);

        // jumlah waktu elapsed di format
        stopwatch.html(formatTime(elapsed));
    }

    $(".start").on("click", function() {
        // Saat start di click, lap yang tadinya disabled menjadi bisa di click
        Lap.prop("disabled", false);

        // Ganti tombol agar yang terlihat hanya lap dan stop
        Start.hide();
        Reset.hide();
        Lap.show();
        Stop.show();

        // Logicnya adalah waktu saat user click start di store didalam startTime dan tidak ganti selama stopwatch berjalan 
        // Lalu nanti ada end time yang akan update setiap millisecond dan endTime - startTime menunjukkan berapa millisecond sudah berjalan
        startTime = Date.now();

        // Menggunakan variabel untuk interval karena nanti akan di clearInterval
        // setiap millisecond, jalankan fungsi updateTime
        stopwatchInterval = setInterval(updateTime, 1); 
    });

    $(".stop").on("click", function() {
        // stop interval setiap millisecondnya
        clearInterval(stopwatchInterval); 

        // jumlah waktu yang paling terakhir di store didalam prevTime untuk ditambahkan kembali ke total elapsednya
        prevTime = elapsed

        // ganti tombol agar hanya start dan reset yang muncul
        Stop.hide();
        Lap.hide();
        Start.show();
        Reset.show();
    });

    $(".lap").on("click", function() {
        // lappedTime merupakan waktu yang sudah berjalan yang dimulai dari waktu lap sebelumnya
        // Jadi kita harus kurangkan elapsed dengan prevLappedTime jika ada
        lappedTime = elapsed - (prevLappedTime || 0);

        // update prevLappedTime menjadi elapsed yang lama
        prevLappedTime = elapsed;

        // tambahkan lappedTime kedalam array yang store semua data lap
        lappedTimes.push(lappedTime);

        // display lap time dalam reverse order
        let time = `<li><p>${lappedTimes.length}</p><p>${formatTime(lappedTime)}</p></li>`;
        lapList.prepend($(time));
    });

    $(".reset").on("click", function() {
        // reset semua variabel yang penting
        lappedTimes = [];
        lapList.empty();
        elapsed = 0;
        prevTime = 0;
        prevLappedTime = 0;
        
        // ganti ulang stopwatch menjadi kosong
        stopwatch.html("00 : 00 : 000");

        // Reset state tombol agar hanya lap dan start yang muncul
        Reset.hide();
        Lap.show();
        Lap.prop("disabled", true);
    });
});
