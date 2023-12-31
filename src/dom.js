const encryptedFileSelectors =
  'div[data-file-type=".encrypted"][data-details-container-group="file"]';

const diffView = (fileDiv) =>
  fileDiv.querySelector('[data-hydro-view]');

const fileContentsPr = (fileDiv, side) => fileDiv
  .querySelector(`[data-side="${side}"][data-original-line]`)
  ?.getAttribute('data-original-line')
  ?.substring(1);

const fileContentsComparison = (fileDiv, side) => {
  const comparisonDiv = fileDiv
    .querySelector(`[data-split-side="${side}"] .blob-code-inner`);

  if (comparisonDiv) {
    return comparisonDiv?.innerHTML;
  }

  const sides = document.querySelectorAll('[data-hunk]');
  if (sides.length !== 2) {
    return undefined;
  }

  const sideDiv = sides[side === 'left' ? 0 : 1];

  return sideDiv.querySelector('.blob-code-inner').innerHTML;
};

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

  diffMode: () => {
    const unifiedOptionButton = document.getElementById('diff_unified_lg');
    if (unifiedOptionButton) {
      return unifiedOptionButton.checked ? 'line-by-line' : 'side-by-side';
    }

    const selectedDiffButton = document
      .querySelector('.SegmentedControl-item--selected button[name="diff"]');

    return selectedDiffButton.value === 'unified'
      ? 'line-by-line'
      : 'side-by-side';
  },

  encryptedFiles: () => document.querySelectorAll(encryptedFileSelectors),

  encryptedFileSelectors,

  fileContents: (fileDiv, side) =>
    fileContentsPr(fileDiv, side) ?? fileContentsComparison(fileDiv, side),
};
