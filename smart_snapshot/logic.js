var is_capture_running;
var alarm_name = 'screen_capture';
var default_interval = 5;

document.body.onload = page_load();

function schedule_task() {
    var interval = document.querySelector('#input_interval').value;
    if (interval == "") {
        interval = default_interval;
    }
    console.log('interval set to ', interval);
    chrome.alarms.create(alarm_name, { periodInMinutes: parseInt(interval) });
}

function stop_schedule() {
    chrome.alarms.clear(alarm_name);
}

function save_settings() {
    var value = document.querySelector('#input_interval').value;
    chrome.storage.local.set({'interval': value}, function() {
        console.log('interval saved as ', value);
      });
    
    chrome.storage.local.set({'is_capture_running': is_capture_running}, function() {
        console.log('toggle saved as ', is_capture_running);
      });
}

function load_settings() {
    chrome.storage.local.get('interval', function(items) {
        console.log('interval loaded as ', items);
        if (items.interval == null) {
            document.querySelector('#input_interval').value = default_interval;
        } else {
            document.querySelector('#input_interval').value = items.interval;
        }
      }); 

    chrome.storage.local.get('is_capture_running', function(items) {
        console.log('is_capture_running loaded as ', items);
        is_capture_running = items.is_capture_running;

        if (is_capture_running == null) {
            is_capture_running = false;
        }

        chrome.alarms.getAll(function(alarms) {
            if (alarms.length == 0) {
                document.querySelector('#btn_snap').innerHTML = 'start periodically capture';
            }
        });

        if (!is_capture_running) {
            document.querySelector('#btn_snap').innerHTML = 'start periodically capture';
        } else {
            document.querySelector('#btn_snap').innerHTML = 'stop periodically capture';
        } 
      }); 
}

function toggle() {
    if (!is_capture_running) {
        is_capture_running = true;
        document.querySelector('#btn_snap').innerHTML = 'stop periodically capture';
        schedule_task();
    } else {
        is_capture_running = false;
        document.querySelector('#btn_snap').innerHTML = 'start periodically capture';
        stop_schedule();
    }

    save_settings();

    console.log("is capture running: " + is_capture_running);

    chrome.alarms.getAll(function(alarms) {
        console.log(alarms);
    });
}

function page_load() {
    load_settings();
}

document.querySelector('#btn_snap').addEventListener('click', function(e) {
    toggle();
});

// hmmm this does not work, need to investigate
// document.querySelector('#input_interval').addEventListener('onchange', function(){
//     console.log('changed!');
// });