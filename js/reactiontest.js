function div_color(){
    document.getElementById('thediv').style.background =
      '#'
      + (4 + Math.floor(Math.random() * 5))
      + (4 + Math.floor(Math.random() * 5))
      + (4 + Math.floor(Math.random() * 5));
}

function reset(){
    if(confirm('Reset best?')){
        window.localStorage.removeItem('reactiontest-best');
        document.getElementById('best').innerHTML = '';
    }
}

function start(){
    start_time = new Date().getTime();
    change_time = 999 + Math.floor(Math.random() * 9000);
    timer = setTimeout(
      'div_color()',
      change_time
    );

    document.getElementById('thediv').style.background = '#fff';

    document.getElementById('start_button').onclick = function(){
        stop();
    };
    document.getElementById('start_button').value = 'Click when the Color Changes [ESC]';
}

function stop(){
    if(timer !== 0){
        var final_time = -(change_time - (new Date().getTime() - start_time));
        clearTimeout(timer);

        if(final_time > 0
          && (best === 0 || final_time < best)){
            best = final_time;
            window.localStorage.setItem(
              'reactiontest-best',
              best
            );
            document.getElementById('best').innerHTML = '+' + best + 'ms';
        }

        document.getElementById('result').innerHTML = final_time > 0
          ? '+' + final_time + 'ms'
          : 'Too soon :(';
        timer = 0;
    }

    document.getElementById('start_button').onclick = function(){
        start();
    };
    document.getElementById('start_button').value = 'Start Timer [H]';
}

var best = 0;
var change_time = 0;
var start_time = 0;
var timer = 0;

// fetch best from localStorage, if it exists
if(window.localStorage.getItem('reactiontest-best') !== null){
    best = window.localStorage.getItem('reactiontest-best');
    document.getElementById('best').innerHTML = '+' + best + 'ms';
}

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    if(key === 72){// H
        stop();
        start();

    }else if(key === 27){// ESC
        stop();
    }
};
