// Function to send message to content script
function sendMessageToContentScript(tabId, message) {
    chrome.tabs.executeScript(tabId, { file: 'contentScript.js' }, () => {
      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }
        // Handle response from content script
        if (response && response.content) {
          console.log(response.content);
        } else {
          console.log("No <p> tag content found.");
        }
      });
    });
  }
  
  // Listener for extension action click
  chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";
  
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
  
    // Send a message to content script to get <p> tag content
    sendMessageToContentScript(tab.id, { action: 'getPTagContent' });
  });
  