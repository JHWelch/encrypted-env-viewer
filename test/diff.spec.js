import * as Diff2html from 'diff2html';
import fs from 'fs';
import { diffHtml } from '../src/diff';

describe('diffHtml', () => {
  let html

  before((done) => {
    fs.readFile('./test/fixtures/diff.html', 'utf8', (err, data) => {
      if (err) throw err;
      html = data;
      done();
    });
  });

  beforeEach(() => {
    sinon.replace(Diff2html, 'html', sinon.fake.returns(html));
  });

  afterEach(() => sinon.restore());

  it('returns the parsed document', () => {
    const doc = diffHtml('_', '_');

    expect(doc).to.exist;
    expect(doc.querySelector('.d2h-wrapper')).to.exist;
  });

  it('removes the file-header', () => {
    const doc = diffHtml('_', '_');

    expect(doc.querySelector('.d2h-file-header')).to.not.exist;
  });
});
