import * as Diff2html from 'diff2html';
import { diffHtml } from '../src/diff';
import { loadFixture } from './support/helpers';

describe('diffHtml', () => {
  const patch = 'Index: patch\n' +
  '===================================================================\n' +
  '--- patch\n' +
  '+++ patch\n';
  let html

  before(() => {
    html = loadFixture('diff.html');
  });

  beforeEach(() => {
    sinon.replace(Diff2html, 'html', sinon.fake.returns(html));
  });

  afterEach(() => sinon.restore());

  it('returns the parsed document', () => {
    const doc = diffHtml('_', '_');

    expect(doc).to.exist;
    expect(doc).to.be.an.instanceof(HTMLElement);
    expect(doc.querySelector('.d2h-wrapper')).to.exist;
  });

  it('removes the file-header', () => {
    const doc = diffHtml('_', '_');

    expect(doc.querySelector('.d2h-file-header')).to.not.exist;
  });

  describe('dark mode', () => {
    it('calls with dark colorScheme', () => {
      diffHtml('_', '_', 'dark');

      expect(Diff2html.html).to.have.been.calledWith(
        patch,
        sinon.match({
          outputFormat: 'side-by-side',
          drawFileList: false,
          matching: 'lines',
          colorScheme: 'dark'
        })
      );
    });
  });

  describe('light mode', () => {
    it('calls with light colorScheme', () => {
      diffHtml('_', '_', 'light');

      expect(Diff2html.html).to.have.been.calledWith(
        patch,
        sinon.match({
          outputFormat: 'side-by-side',
          drawFileList: false,
          matching: 'lines',
          colorScheme: 'light'
        })
      );
    });
  });

  describe('auto mode', () => {
    it('calls with auto colorScheme', () => {
      diffHtml('_', '_', 'auto');

      expect(Diff2html.html).to.have.been.calledWith(
        patch,
        sinon.match({
          outputFormat: 'side-by-side',
          drawFileList: false,
          matching: 'lines',
          colorScheme: 'auto'
        })
      );
    });
  });
});
