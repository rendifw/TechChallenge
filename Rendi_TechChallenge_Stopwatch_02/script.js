


$(function() {
    let lappedTimes = [];

    let Start = $(".start");
    let Stop = $(".stop");
    let Lap = $(".lap");
    let Reset = $(".reset");

    let stopwatch = $("#stopwatch");
    
    let lapList = $(".lap-list");

    let startTime, prevTime, stopwatchInterval, elapsed; 
    let hours, minutes, seconds, milliseconds;
    let displayHours, displayMinutes, displaySeconds, displayMilliseconds;
    let lappedTime, prevLappedTime;

    function formatTime(ms) {
        
        hours = Math.floor(ms / 3600000);
        minutes = Math.floor((ms % 3600000) / 60000);
        seconds = Math.floor((ms % 60000) / 1000);
        milliseconds = ms % 1000;
    
        displayHours = hours < 10 ? "0" + hours : hours;
        displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        displaySeconds = seconds < 10 ? "0" + seconds : seconds;
        displayMilliseconds = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

        return `${hours ? displayHours + " : " : ""}${displayMinutes} : ${displaySeconds} : ${displayMilliseconds}`;
    }

    function updateTime() {
        let endTime = Date.now();
        elapsed = endTime - startTime + (prevTime || 0);

        stopwatch.html(formatTime(elapsed));

    }

    $(".start").on("click", function() {
        Lap.prop("disabled", false);
        Start.hide();
        Reset.hide();
        Lap.show();
        Stop.show();

        startTime = Date.now();
        stopwatchInterval = setInterval(updateTime, 1); 
    });

    $(".stop").on("click", function() {
        clearInterval(stopwatchInterval); 
        prevTime = elapsed
        Stop.hide();
        Lap.hide();
        Start.show();
        Reset.show();
    });

    $(".lap").on("click", function() {
        lappedTime = elapsed - (prevLappedTime || 0);
        prevLappedTime = elapsed;
        let time = `<li><p>${lappedTimes.length + 1}</p><p>${formatTime(lappedTime)}</p></li>`;
        // TODO: Add fastest and slowest color functionality
        lappedTimes.push(lappedTime);
        lapList.prepend($(time));
    });

    $(".reset").on("click", function() {
        lappedTimes = [];
        lapList.empty();
        elapsed = 0;
        prevTime = 0;
        prevLappedTime = 0;
        
        stopwatch.html("00 : 00 : 000");

        Reset.hide();
        Lap.show();
        Lap.prop("disabled", true);
    });
});
