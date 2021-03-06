chrome.runtime.onInstalled.addListener(onInstalled);
chrome.tabs.onCreated.addListener(onCreated);
chrome.tabs.onUpdated.addListener(onUpdated);
chrome.browserAction.onClicked.addListener(toggleActive)

let active = false;
let awaitingUrlFromTab = null;

function onInstalled(ev) {
  console.log('sodiepop is now popping urls')
}

function onCreated(tab) {
  if (!active) {
    return;
  }

  if (tab.url) {
    handleUrl(tab.url);
  } else {
    awaitingUrlFromTab = tab.id;
  }
}

function onUpdated(tabId, changeInfo, tab) {
  if (!active) {
    return;
  }

  if (awaitingUrlFromTab === tabId && changeInfo.url) {
    handleUrl(changeInfo.url);
    awaitingUrlFromTab = null;
  }
}

function handleUrl(url) {
  const urlParts = url.split('/');
  trimTrailingSlash(urlParts);
  copyToClipboard(urlParts.pop());
}

function trimTrailingSlash(urlParts) {
  if (urlParts[urlParts.length - 1] === '/') {
    urlParts.pop();
  } 
}

function copyToClipboard(text) {
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}

function toggleActive(tab) {
  active = !active;
  const path = active ? 'icons/icon32.png' : 'icons/icon32-inactive.png';
  const title = active ? 'Disable sodiepop' : 'Activate sodiepop';
  chrome.browserAction.setTitle({ title })
  chrome.browserAction.setIcon({ path });
}
