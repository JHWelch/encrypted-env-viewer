import { decryptEnv } from './decrypt';
import { diffHtml } from './diff';
import dom from './dom';

export const initEnvViewer = () => dom.encryptedFiles()
  .forEach(handleEncryptedFile);

const handleEncryptedFile = (fileDiv) => dom.addDecryptButton(
  fileDiv,
  (event) => decryptButtonCallback(event, fileDiv.id),
);

export const decryptButtonCallback = async (event, fileId) => {
  const key = prompt('Enter encryption key');

  if (!key) { return; }
  const fileDiv = document.getElementById(fileId);

  const left = dom.fileContents(fileDiv, 'left') ?? '';
  const right = dom.fileContents(fileDiv, 'right') ?? '';

  const [leftDecrypted, rightDecrypted] = await Promise.all([
    decryptEnv(left, key),
    decryptEnv(right, key),
  ]);

  dom.addNewDiff(fileDiv, diffHtml(
    leftDecrypted,
    rightDecrypted,
    dom.colorMode(),
    dom.diffMode(),
  ));
  event.target.remove();
};
