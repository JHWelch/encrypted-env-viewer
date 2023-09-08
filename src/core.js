import { decryptEnv } from './decrypt';
import { diffHtml } from './diff';
import dom from './dom';

const handleEncryptedFile = (fileDiv) => {
  const left = dom.fileContents(fileDiv, 'left');
  const right = dom.fileContents(fileDiv, 'right');

  if (!left || !right) {
    alert('Could not find file contents');
    return;
  }

  dom.addDecryptButton(fileDiv, () => {
    const key = prompt('Enter encryption key');

    Promise.all([
      decryptEnv(left, key),
      decryptEnv(right, key),
    ]).then(([leftDecrypted, rightDecrypted]) => {
      dom.addNewDiff(fileDiv, diffHtml(leftDecrypted, rightDecrypted));
    });
  });
};

export const addLocationObserver = (callback) => {
  const config = { attributes: false, childList: true, subtree: false };

  const observer = new MutationObserver(callback);

  observer.observe(document.body, config);
};

export const observerCallback = () => {
  if (window.location.href.startsWith('https://github.com')) {
    // Has to wait for page load
    sleep(1000).then(initEnvViewer);
  }
};

export const initEnvViewer = () => dom.encryptedFiles()
  .forEach(handleEncryptedFile);

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
