export function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    sendUrl(tab);
  });
}

const sendUrl = (tab) => {
  let url = tab.url;
  fetch("http://localhost:5000/process", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
  console.log(url);
  console.log(tab.url);
};
