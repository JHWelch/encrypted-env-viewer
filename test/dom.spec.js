import { loadFixture } from "./support/helpers";
import dom from '../src/dom';

let html;

before(() => {
  html = loadFixture('github_pr.html');
});

beforeEach(() => {
  global.document = new window.DOMParser().parseFromString(html, 'text/html');
});

describe('encryptedFiles', () => {
  it('should return all instances of encrypted files', () => {
    const files = dom.encryptedFiles();

    expect(files).to.exist;
    expect(files).to.be.an.instanceof(NodeList);
    expect(files.length).to.equal(1);
  });
});
