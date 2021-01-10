//chrome.extension.onMessage.addListener(
//        function(request, sender, sendResponse) {
//            debugger;
//            if (request.action == 'PageInfo') {
//                var pageInfos = [];
//
//                $('a').each(function() {
//                    var pageInfo = {};
//                    var href = $(this).attr('href');
//                    if (href != null && href.indexOf("http") == 0) {
//                        //only add urls that start with http
//                        pageInfo.url = href
//                        pageInfos.push(pageInfo);
//                    }
//                });
//                sendResponse(pageInfos);
//            }
//        });

// The 'reqestFilter' parameter allows you to only listen for
// certain requests. Chrome 17 requires that, at the very least,
// it defines the URLs you wish to subscribe to. In the general
// case, we want to subscribe to all URL's, so we'll explicitly
// declare this requirement.
var requestFilter = {
    urls: ["<all_urls>"]
},
// The 'extraInfoSpec' parameter modifies how Chrome calls your
// listener function. 'requestHeaders' ensures that the 'details'
// object has a key called 'requestHeaders' containing the headers,
// and 'blocking' ensures that the object your function returns is
// used to overwrite the headers
extraInfoSpec = ['requestHeaders', 'blocking'],
        // Chrome will call your listener function in response to every
        // HTTP request
        handler = function(details) {

            var headers = details.requestHeaders,
                    blockingResponse = {};

            // Each header parameter is stored in an array. Since Chrome
            // makes no guarantee about the contents/order of this array,
            // you'll have to iterate through it to find for the
            // 'User-Agent' element
            for (var i = 0, l = headers.length; i < l; ++i) {
                if (headers[i].name == 'User-Agent') {
                    headers[i].value = '>>> Your new user agent string here <<<';
                    break;
                }
                // If you want to modify other headers, this is the place to
                // do it. Either remove the 'break;' statement and add in more
                // conditionals or use a 'switch' statement on 'headers[i].name'
            }

            blockingResponse.requestHeaders = headers;
            return blockingResponse;
        };

//chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);        