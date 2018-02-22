var start = false;
var time = 0;
var timer = document.getElementById('timer');
var startTime = 00;
var timerRef = 0;
var list = document.getElementById('list');
var statbutton = document.getElementById("start/stop").addEventListener("click", startStop);
var reset = document.getElementById("reset").addEventListener("click", reset);
var record = document.getElementById("record").addEventListener("click", record);



document.addEventListener("keypress", function(key) {
    console.log(key.key)
    if(key.key == 's') {
        startStop();}
    if(key.key == 'r'){
        reset();}
    if(key.key == 'l'){
        record();}
});
function startTimer() {
    timerRef =  setInterval(function timer() {
        //var currentTime = (new Date).getTime();
        //console.log(timer.textContent);
        window.timer.textContent = (startTime++/100).toFixed(2);
    },10);
}

function stopTimer() {
    clearInterval(timerRef) ;
    timerRef = 0;
    //startTime = (new Date).getTime();
}

function startStop ( ) {
    timerRef ? stopTimer() : startTimer(); 
}

function reset ( ) {
    timer.innerHTML  = 0;
    list.innerHTML = "";
    //clearInterval(timerRef);
    //timerRef = 0;
    startTime = 00;
}

function record () {
    var li = document.createElement('li');
    li.innerHTML = (startTime/100).toFixed(2);
    list.appendChild(li)
}