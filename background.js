var dialupAudio = new Audio();
dialupAudio.src = "aol.mp3";
var timeoutlen = 3000;
var timeouts = {};

function playDialup(requestId)
{
    if (dialupAudio.paused || dialupAudio.ended)
    {
        dialupAudio.play();
    }
    delete timeouts[requestId];
}

function pauseDialup(requestId)
{
    clearTimeout(timeouts[requestId]);
    if (dialupAudio.paused == false)
    {
        dialupAudio.pause();
    }
    delete timeouts[requestId];
}

chrome.webRequest.onSendHeaders.addListener(
    function(details)
    {
        timeouts[details.requestId] = setTimeout(function() { playDialup(details.requestId); }, timeoutlen);
    },

    {urls: ["*://confluence.community.veritas.com/*"]}
);

chrome.webRequest.onCompleted.addListener(
    function(details)
    {
        pauseDialup(details.requestId);
    },

    {urls: ["*://confluence.community.veritas.com/*"]}
);

chrome.webRequest.onErrorOccurred.addListener(
    function(details)
    {
        pauseDialup(details.requestId);
    },

    {urls: ["*://confluence.community.veritas.com/*"]}
);
