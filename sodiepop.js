chrome.runtime.onInstalled.addListener(onInstalled);
chrome.tabs.onUpdated.addListener(onUpdated);

function onInstalled(ev) {
  console.log('sodiepop is now popping urls')
}

function onUpdated(tabId, changeInfo, tab) {
  if (changeInfo.status === "loading" && changeInfo.url) {
    var urlParts = changeInfo.url.split('/');
    trimTrailingSlash(urlParts);
    copyToClipboard(urlParts.pop());
  }
}

function trimTrailingSlash(urlParts) {
  if (urlParts[urlParts.length - 1] === '/') {
    urlParts.pop();
  } 
}

function copyToClipboard(text) {
  var input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}
