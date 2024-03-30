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

  const pTags = document.getElementsByTagName("p");

  // `document.querySelector` may return null if the selector doesn't match anything.
  if (pTags) {
    let textContent = "";
    const wordMatchRegExp = /[^\s]+/g; // line.Regular expression
    for (let i = 0; i < pTags.length; i++) {
      textContent += pTags[i].textContent + " ";
    }
  }

  console.log(textContent);
});
