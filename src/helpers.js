const CryptoJS = require("crypto-js");
const Diff = require('diff');
const Diff2html = require('diff2html');

const encryptedFileSelectors = 'div[data-file-type=".encrypted"][data-details-container-group="file"]';

const diff2HtmlConfig = {
  drawFileList: false,
  matching: 'lines',
  outputFormat: 'side-by-side',
};

const addDecryptButton = (fileDiv) => {
  let button = document.createElement('button');
  button.innerText = 'Decrypt';
  button.classList.add('btn', 'btn-sm', 'btn-secondary', 'ml-2');

  button.addEventListener('click', () => {
    const left = getFileContent(fileDiv, 'left');
    const right = getFileContent(fileDiv, 'right');

    if (!left || !right) {
      alert('Could not find file contents');
      return;
    }

    const key = prompt('Enter encryption key')

    Promise.all([
      decryptEnv(left, key),
      decryptEnv(right, key),
    ]).then(([leftDecrypted, rightDecrypted]) => {
      const html = diffHtml(diff(leftDecrypted, rightDecrypted));

      const inside = fileDiv.querySelector('[data-hydro-view]');
      inside.innerHTML = '';
      inside.appendChild(html);
    })
  });

  fileDiv.children[0].appendChild(button);
}

const diff = (left, right) => Diff.createPatch('patch', left, right);

const diffHtml = (diff) => {
  const html = Diff2html.html(diff, diff2HtmlConfig);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const header = doc.querySelector('.d2h-file-header');
  header.parentNode.removeChild(header);

  return doc.body;
}

const getFileContent = (fileDiv, side) => {
  const div = fileDiv.querySelector(`[data-split-side="${side}"]`);

  if (!div) {
    return;
  }

  return div.children[0].getAttribute('data-original-line').substring(1);
}

export const addLocationObserver = (callback) => {
  const config = { attributes: false, childList: true, subtree: false }

  const observer = new MutationObserver(callback)

  observer.observe(document.body, config)
}

export const observerCallback = () => {
  if (window.location.href.startsWith('https://github.com')) {
    // Has to wait for page load
    sleep(1000).then(initEnvViewer);
  }
}

const initEnvViewer = () => document.querySelectorAll(encryptedFileSelectors)
  .forEach(addDecryptButton);

export const decryptEnv = async (fullFile, key) => {
  if (key.startsWith('base64:')) {
    key = key.substring(7);
  }

  const fileObject = await JSON.parse(atob(fullFile));

  const parsedKey = CryptoJS.enc.Base64.parse(key);
  const iv  = CryptoJS.enc.Base64.parse(fileObject.iv);

  const decryptedWA = CryptoJS.AES.decrypt(fileObject.value, parsedKey, { iv: iv});

  return trimEnv(decryptedWA.toString(CryptoJS.enc.Utf8));
}

export const trimEnv = (env) => env.match(/s:\d+:"([\s\S]*)";/)[1];

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
