const encryptedFileSelectors =
  'div[data-file-type=".encrypted"][data-details-container-group="file"]';

const diffView = (fileDiv) => fileDiv.querySelector('[data-hydro-view]');

export default {
  encryptedFiles: () => document.querySelectorAll(encryptedFileSelectors),

  fileContents: (fileDiv, side) => {
    const div = fileDiv.querySelector(`[data-split-side="${side}"]`);

    if (!div) {
      return;
    }

    return div.children[0].getAttribute('data-original-line').substring(1);
  },

  addDecryptButton: (fileDiv, onClick) => {
    let button = document.createElement('button');
    button.innerHTML = 'Decrypt';
    button.classList.add('btn', 'btn-sm', 'btn-secondary', 'ml-2');
    button.setAttribute('data-test', 'decrypt-env');
    button.addEventListener('click', onClick);

    fileDiv.children[0].appendChild(button);
  },

  addNewDiff: (fileDiv, diff) => {
    const inside = diffView(fileDiv);
    inside.innerHTML = '';
    inside.appendChild(diff);
  },
};
