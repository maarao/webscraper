export function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    sendUrl(tab);
  });
}

const sendUrl = async (tab) => {
  let url = tab.url;
  try {
    const response = await fetch("http://127.0.0.1:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: url }),
    });
    const data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    console.error("Error:", error);
  }
};
