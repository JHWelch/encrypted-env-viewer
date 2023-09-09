import { loadFixture } from "./support/helpers";
import dom from '../src/dom';

let html;

beforeEach(() => {
  global.document = new window.DOMParser().parseFromString(html, 'text/html');
});

describe('PR page', () => {
  before(() => {
    html = loadFixture('github_pr.html');
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

    describe('file contents cannot be found', () => {
      it('should return undefined', () => {
        const fileDiv = document.createElement('div');
        fileDiv.innerHTML = '<div data-split-side="left"></div>';
        const contents = dom.fileContents(fileDiv, 'left');

        expect(contents).to.be.undefined;
      });
    });
  });

  describe('addDecryptButton', () => {
    it('should add a button to the file', () => {
      const fileDiv = dom.encryptedFiles()[0];
      const button = fileDiv.querySelector('[data-test="decrypt-env"]');

      expect(button).to.not.exist;

      dom.addDecryptButton(fileDiv, () => {});

      expect(fileDiv.querySelector('[data-test="decrypt-env"]')).to.exist;
    });
  });

  describe('addNewDiff', () => {
    it('should replace the diff view with the new diff', () => {
      const fileDiv = dom.encryptedFiles()[0];
      const diff = document.createElement('div');
      diff.innerHTML = 'new diff';

      const inside = fileDiv.querySelector('[data-hydro-view]');

      expect(inside.innerHTML).to.not.equal(diff.innerHTML);

      dom.addNewDiff(fileDiv, diff);

      expect(inside.innerHTML).to.equal(diff.outerHTML);
    });
  });
});
