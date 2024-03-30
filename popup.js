document.addEventListener('DOMContentLoaded', function() {
  var readContentButton = document.getElementById('readContent');
  var contentDiv = document.getElementById('content');

  readContentButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getDOMContent"}, function(response) {
        contentDiv.textContent = response.content;
        console.log(response.content);
      });
    });
  });
});
