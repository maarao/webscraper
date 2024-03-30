chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getDOMContent") {
    chrome.tabs.executeScript({
      code: 'document.body.innerText'
    }, function(result) {
      sendResponse({ content: result[0] });
    });
    return true;
  }
});
