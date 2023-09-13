import { decryptEnv } from './decrypt';
import { diffHtml } from './diff';
import dom from './dom';

export const initEnvViewer = () => dom.encryptedFiles()
  .forEach(handleEncryptedFile);

const handleEncryptedFile = (fileDiv) => dom.addDecryptButton(
  fileDiv,
  (event) => decryptButtonCallback(event, fileDiv),
);

export const decryptButtonCallback = async (event, fileDiv) => {
  const key = prompt('Enter encryption key');

  if (!key) { return; }

  const left = dom.fileContents(fileDiv, 'left') ?? '';
  const right = dom.fileContents(fileDiv, 'right') ?? '';

  const [leftDecrypted, rightDecrypted] = await Promise.all([
    decryptEnv(left, key),
    decryptEnv(right, key),
  ]);

  dom.addNewDiff(fileDiv, diffHtml(leftDecrypted, rightDecrypted));
  event.target.remove();
};
