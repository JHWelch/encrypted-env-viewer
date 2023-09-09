import { initEnvViewer } from './env_viewer';
import { sleep } from './helpers';

const PR_URL_REGEX =
  /https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+\/files/;

export const addLocationObserver = (callback) => {
  const observer = new MutationObserver(callback);

  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });
};

export const observerCallback = async () => {
  if (!window.location.href.match(PR_URL_REGEX)) {
    window.encryptedEnvViewerLoaded = false;
    return;
  }

  if (window.encryptedEnvViewerLoaded) { return; }

  window.encryptedEnvViewerLoaded = true;
  await sleep(1000);
  initEnvViewer();
};
