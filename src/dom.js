const encryptedFileSelectors = 'div[data-file-type=".encrypted"][data-details-container-group="file"]';

export default {
  fileContents: (fileDiv, side) => {
    const div = fileDiv.querySelector(`[data-split-side="${side}"]`);

    if (!div) {
      return;
    }

    return div.children[0].getAttribute('data-original-line').substring(1);
  },

  encryptedFiles: () => document.querySelectorAll(encryptedFileSelectors),
}
