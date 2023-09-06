import { decryptEnv } from "./decrypt";
import dom from "./dom";

const Diff = require('diff');
const Diff2html = require('diff2html');

const diff2HtmlConfig = {
  drawFileList: false,
  matching: 'lines',
  outputFormat: 'side-by-side',
};

const handleEncryptedFile = (fileDiv) => {
  const left = dom.fileContents(fileDiv, 'left');
  const right = dom.fileContents(fileDiv, 'right');

  if (!left || !right) {
    alert('Could not find file contents');
    return;
  }

  dom.addDecryptButton(fileDiv, () => {
    const key = prompt('Enter encryption key')

    Promise.all([
      decryptEnv(left, key),
      decryptEnv(right, key),
    ]).then(([leftDecrypted, rightDecrypted]) => {
      const html = diffHtml(diff(leftDecrypted, rightDecrypted));
      const inside = dom.diffView(fileDiv);
      inside.innerHTML = '';
      inside.appendChild(html);
    })
  });
}

const diff = (left, right) => Diff.createPatch('patch', left, right);

const diffHtml = (diff) => {
  const html = Diff2html.html(diff, diff2HtmlConfig);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const header = doc.querySelector('.d2h-file-header');
  header.parentNode.removeChild(header);

  return doc.body;
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

export const initEnvViewer = () => dom.encryptedFiles()
  .forEach(handleEncryptedFile);

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
