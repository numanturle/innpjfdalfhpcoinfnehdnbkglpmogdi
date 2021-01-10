var addHeaders = [];
var modifyHeaders = {};
var filterHeaders = {};
var targetHeaders = [];
var enabled = false;

function setStatus(status) {
    enabled = status === 'STARTED';
//    console.log('Plugin enabled: ' + enabled);
}

function setHeaders(headers) {
    addHeaders.splice(0, addHeaders.length);
    for (var member in modifyHeaders)
        delete modifyHeaders[member];
    for (var member in filterHeaders)
        delete filterHeaders[member];

    for (var j = 0; j < headers.length; ++j) {
        var header = headers[j];
        if (header && header.state === 'ENABLED') {
            if (header.action === 'Add') {
                addHeaders.push(header);
            } else if (header.action === 'Modify') {
                modifyHeaders[header.name] = header;
            } else if (header.action === 'Filter') {
                filterHeaders[header.name] = header;
            }
        }
    }
//    console.log('addHeaders: ' + JSON.stringify(addHeaders));
//    console.log('modifyHeaders: ' + JSON.stringify(modifyHeaders));
//    console.log('filterHeaders: ' + JSON.stringify(filterHeaders));
}

function initialize() {
    var status = $.jStorage.get('CMH.CTRL');
    if (!status)
        status = 'STOPPED';
    setStatus(status);

    var headers = jQuery.jStorage.get('CMH.HEADERS');
    if (!headers)
        headers = [];
    setHeaders(headers);
}

function openOrFocusOptionsPage() {
    var optionsUrl = chrome.extension.getURL('options.html');
    chrome.tabs.query({}, function(extensionTabs) {
        var found = false;
        for (var i = 0; i < extensionTabs.length; i++) {
            if (optionsUrl === extensionTabs[i].url) {
                found = true;
                chrome.tabs.update(extensionTabs[i].id, {"selected": true});
            }
        }
        if (found === false) {
            chrome.tabs.create({url: "options.html"});
        }
    });
}
chrome.extension.onConnect.addListener(function(port) {
    var tab = port.sender.tab;
    // This will get called by the content script we execute in
    // the tab as a result of the user pressing the browser action.
    port.onMessage.addListener(function(info) {
        var max_length = 1024;
        if (info.selection.length > max_length)
            info.selection = info.selection.substring(0, max_length);
        openOrFocusOptionsPage();
    });
});

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
    openOrFocusOptionsPage();
});

chrome.tabs.onActivated.addListener(function() {
    initialize();
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status === "loading") {
        initialize();
    }
});

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var headers = details.requestHeaders,
            blockingResponse = {};

    targetHeaders.splice(0, targetHeaders.length);
    if (enabled) {
        for (var i = 0, l = headers.length; i < l; ++i) {
            var sourceHeader = headers[i];
            var targetHeader = modifyHeaders[sourceHeader.name];

            if (targetHeader) {
                targetHeaders.push({name: targetHeader.name, value: targetHeader.value});
            } else {
                targetHeader = filterHeaders[sourceHeader.name];
                if (targetHeader) {
                    continue;
                } else {
                    targetHeaders.push({name: sourceHeader.name, value: sourceHeader.value});
                }
            }
        }
        for (var i = 0, l = addHeaders.length; i < l; ++i) {
            var header = addHeaders[i];
            targetHeaders.push({name: header.name, value: header.value});
        }
    } else {
        targetHeaders = headers;
    }
//    console.log(JSON.stringify(targetHeaders));
    blockingResponse.requestHeaders = targetHeaders;
    return blockingResponse;
},
        {urls: ["<all_urls>"]}, ['requestHeaders', 'blocking']);