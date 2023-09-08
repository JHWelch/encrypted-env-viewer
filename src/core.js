import { initEnvViewer } from './env_viewer';
import { sleep } from './helpers';

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
