import { initEnvViewer } from './env_viewer';
import { sleep } from './helpers';

export const addLocationObserver = (callback) => {
  const observer = new MutationObserver(callback);

  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: false,
  });
};

export const observerCallback = async () => {
  if (window.location.href.startsWith('https://github.com')) {
    // Has to wait for page load
    await sleep(1000);

    initEnvViewer();
  }
};
