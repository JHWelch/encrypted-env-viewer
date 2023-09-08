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

describe('fileContents', () => {
  describe('side can be found', () => {
    it('should return the file contents', () => {
      const fileDiv = dom.encryptedFiles()[0];
      const contents = dom.fileContents(fileDiv, 'left');

      expect(contents).to.exist;
      expect(contents).to.equal('eyJpdiI6IkhTYTRJdUx0dUQyTnBaRG1sTkMySHc9PSIsInZhbHVlIjoieDJXTmNkVmkyeVg1Qmg5b1VDUGVCdz09IiwibWFjIjoiN2NiNTdkZWY4YjBlZmFmNTdkYjJhZWU5NTQyNjIwNGNiYmZjNGVmZTYxNjA5NDQxNDVlYWFiNzhkYjBkODEzYyIsInRhZyI6IiJ9');
    });
  });

  describe('side cannot be found', () => {
    it('should return undefined', () => {
      const fileDiv = document.createElement('div');
      const contents = dom.fileContents(fileDiv, 'right');

      expect(contents).to.be.undefined;
    });
  });
});
