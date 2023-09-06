const Diff = require('diff');
const Diff2html = require('diff2html');

const diff2HtmlConfig = {
  drawFileList: false,
  matching: 'lines',
  outputFormat: 'side-by-side',
};

const diff = (left, right) => Diff.createPatch('patch', left, right);

export const diffHtml = (left, right) => {
  const html = Diff2html.html(diff(left, right), diff2HtmlConfig);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const header = doc.querySelector('.d2h-file-header');
  header.parentNode.removeChild(header);

  return doc.body;
}