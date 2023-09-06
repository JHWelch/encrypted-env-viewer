const CryptoJS = require("crypto-js");

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
