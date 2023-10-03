const encryptedFileSelectors =
  'div[data-file-type=".encrypted"][data-details-container-group="file"]';

const diffView = (fileDiv) =>
  fileDiv.querySelector('[data-hydro-view]');

export default {
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

  colorMode: () => document.querySelector('html').dataset.colorMode,

  encryptedFiles: () => document.querySelectorAll(encryptedFileSelectors),

  fileContents: (fileDiv, side) => {
    const div = fileDiv
      .querySelector(`[data-side="${side}"][data-original-line]`);

    if (div) {
      const data = div.getAttribute('data-original-line');
      if (data) {
        return data.substring(1);
      }
    }

    const comparisonDiv = fileDiv
      .querySelector(`[data-split-side="${side}"] .blob-code-inner`);
    if (comparisonDiv) {
      return comparisonDiv.children[0].innerHTML;
    }
  },
};
