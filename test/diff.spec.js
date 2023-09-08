import * as Diff2html from 'diff2html';
import { diffHtml } from '../src/diff';
import { loadFixture } from './support/helpers';

describe('diffHtml', () => {
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
});
