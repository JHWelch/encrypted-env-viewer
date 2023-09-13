import CryptoJS from 'crypto-js';

export const decryptEnv = async (fullFile, key) => {
  if (fullFile === '') { return ''; }

  const parsedKey = key.startsWith('base64:')
    ? CryptoJS.enc.Base64.parse(key.substring(7))
    : CryptoJS.enc.Utf8.parse(key);

  const fileObject = await JSON.parse(atob(fullFile));
  const parsedIv  = CryptoJS.enc.Base64.parse(fileObject.iv);

  const decryptedWA = CryptoJS.AES.decrypt(
    fileObject.value,
    parsedKey,
    { iv: parsedIv },
  );

  return trimEnv(decryptedWA.toString(CryptoJS.enc.Utf8));
};

export const trimEnv = (env) => env.match(/s:\d+:"([\s\S]*)";/)[1];
