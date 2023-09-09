import { decryptEnv } from './decrypt';
import { diffHtml } from './diff';
import dom from './dom';

export const initEnvViewer = () => dom.encryptedFiles()
  .forEach(handleEncryptedFile);

const handleEncryptedFile = (fileDiv) => {
  const left = dom.fileContents(fileDiv, 'left') ?? '';
  const right = dom.fileContents(fileDiv, 'right') ?? '';

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
