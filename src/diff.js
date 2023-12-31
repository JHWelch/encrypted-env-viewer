import * as Diff from 'diff';
import * as Diff2html from 'diff2html';

const diff2HtmlConfig = {
  drawFileList: false,
  matching: 'lines',
};

const diff = (left, right) => Diff.createPatch('patch', left, right);

export const diffHtml = (
  left,
  right,
  colorScheme = 'light',
  outputFormat = 'side-by-side',
) => {
  const html = Diff2html.html(diff(left, right), {
    ...diff2HtmlConfig,
    colorScheme,
    outputFormat,
  });
  const doc = new window.DOMParser().parseFromString(html, 'text/html');
  const header = doc.querySelector('.d2h-file-header');
  header.parentNode.removeChild(header);

  return doc.body;
};
