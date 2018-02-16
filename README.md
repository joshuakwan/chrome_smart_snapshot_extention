# Introduction

This chrome extension allows you to configure and capture a tab periodically. The capture process is running in the background so you only need to configure the capture interval and click `start`.
Just make sure to put the page you want to capture at the active state. To stop the process, click `stop`.

## How to install

Currently you will have to manually install the extension by cloning this repo or downloading as a ZIP. Then go to `chrome://extensions/` in your Chrome browser and click `Load unpacked extension`, select the path of the extension on your local machine and then it should appear in the extension list.

## Some debug tips

On `chrome://extensions/` choose `Inspect views: background page` to get some valueable info for debugging:

* Get capture interval stored in local Chrome storage:
    ```javascript
    chrome.storage.local.get('interval',function(items){ console.log(items.interval);});
    ```

* Get the boolean value which indicates the running setting stored in local Chrome storage:
    ```javascript
    chrome.storage.local.get('is_capture_running',function(items){ console.log(items.is_capture_running);});
    ```

* Get all alarms (for periodical tasks):
    ```javascript
    chrome.alarms.getAll(function(alarms){ console.log(alarms);});
    ```

* Get all notifications:
    ```javascript
    chrome.notifications.getAll(function(items){ console.log(items);})
    ```

## Limitations & Future Plans

* There might be abuse of permissions, will refine in later versions.
* Currently the extension only captures visible parts of a tab. Will support a whole page capture in the future.
* May support capturing specified tabs in the future.
* Support specifying downloaded filenames and destination in the future.