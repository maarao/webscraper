chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getPTagContent') {
      const pTags = document.getElementsByTagName("p");
      let textContent = "";
      const wordMatchRegExp = /[^\s]+/g;
      for (let i = 0; i < pTags.length; i++) {
        textContent += pTags[i].textContent + " ";
      }
      sendResponse({ content: textContent.trim() });
    }
  });
