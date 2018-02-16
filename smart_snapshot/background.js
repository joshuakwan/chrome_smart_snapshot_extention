chrome.alarms.onAlarm.addListener(function( alarm ) {
    console.log('next alarm', alarm);
    capture();
});

function capture() {
    chrome.tabs.captureVisibleTab(null,{ format: "png", quality: 100}, function(data){
        var image = new Image();
        image.onload = function() {

            chrome.notifications.clear('reminder', function(wasCleared){
                console.log('notifications cleared: ', wasCleared);
            });

            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            var image_title = 'capture-' + (new Date()).toString() + '.png';

            var link = document.createElement('a');
            link.download = image_title
            link.href = canvas.toDataURL();
            link.click();

            chrome.notifications.create('reminder', 
            {
                type: 'basic',
                iconUrl: 'icon_128.png',
                title: 'Snapshot captured and downloaded!',
                message: 'Snapshot captured and downloaded to ' + image_title
            }, 
            function(notificationId) {}
        );
        }

        image.src = data;
    });
}