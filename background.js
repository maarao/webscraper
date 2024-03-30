// // Listener for extension action click
// chrome.action.onClicked.addListener(async (tab) => {
//   // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//   const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//   // Next state will always be the opposite
//   const nextState = prevState === "ON" ? "OFF" : "ON";

//   // Set the action badge to the next state
//   await chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: nextState,
//   });

//   if (nextState === "ON") {
//     // Insert the CSS file when the user turns the extension on
//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => {
//         const pTags = document.getElementsByTagName("p");
//         let textContent = "";
//         // const wordMatchRegExp = /[^\s]+/g;
//         for (let i = 0; i < pTags.length; i++) {
//           textContent += pTags[i].textContent + " ";
//         }
//         console.log(textContent.trim());
//       },
//     });
//   } else if (nextState === "OFF") {
//   }
// });
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({
    url: chrome.extension.getURL("popup.html"),
    active: true,
  });
});
