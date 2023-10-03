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

  describe('colorScheme: dark', () => {
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

  describe('colorScheme: light', () => {
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

  describe('colorScheme: auto', () => {
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

  describe('outputFormat: side-by-side', () => {
    it('calls with side-by-side outputFormat', () => {
      diffHtml('_', '_', 'auto', 'side-by-side');

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

  describe('outputFormat: line-by-line', () => {
    it('calls with line-by-line outputFormat', () => {
      diffHtml('_', '_', 'auto', 'line-by-line');

      expect(Diff2html.html).to.have.been.calledWith(
        patch,
        sinon.match({
          outputFormat: 'line-by-line',
          drawFileList: false,
          matching: 'lines',
          colorScheme: 'auto'
        })
      );
    });
  });
});
