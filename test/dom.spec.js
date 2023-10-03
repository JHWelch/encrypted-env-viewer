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

describe('Comparison page', () => {
  before(() => {
    html = loadFixture('github_comparison.html');
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
        expect(contents).to.equal('eyJpdiI6Ijk2YnpRZEdkUm1LNjBuUy80OTcwSmc9PSIsInZhbHVlIjoiZ0JWVDhpdUV4Qkd4UlZ0bEU1enJFQ1JVMmNocVZSZUJ2dVZJVWlHYTFBeVBSbkgycnMyOEJvbERvcXNieG05UUMrWjVQUUdRdEJGZ3I1Tm9IWTNlRzI5bmQyQlh5T01pY1Z3VDZKV0NwVmJxaGtGYVQyNHZiSE82SmtSS0JHQnlQQkVaS3JFMVJKMmg2WFBQSkZDTHJ6aXBVVVRaWG1OT0ltcGhFL2VQWFFEaXJUbmJsOXBFS2pNbVVKaEhLZzVNdmpjYWFmTGQ4M2FCVFhibTMvMG5JYTcreVpoKzVhODZMK2RSdWFUcWM4cEx3N2RtM1o5cnlNRmwxVkgxcWdWWTQ4ZDJOMDlTWXdQUy9Da0RaUXRycUM0dDdEb1pnL1ZtWjlEdDRSSmg3UmxES0orME5zdGZjNVVqTHlGcVBoNVBJV0pzbHVhNFVvYnpxeEZSSzVCNXk2SlNBZlhjb1BYS25VdVIrQ0thTXU1SXFHTjVDMVp1TzZ1OHp1M3JuaW1KWU1IRG9JcGFSSWFsODlRRStvaHFFZi9Ca09kVUtlblhuWSs4RlI3Unp0WHpHUjNwZ2VuRjFUZFFpODBISFl0dDFrUkwya2lZdzhZZXFNKytnUmhxQTI2R0RjZGZBVnppYkprOWpnSmZBc0t2MW1oMVRBRTJtQVVhYk5HdW1LWHJmQ0gwZXJBQ3JFTDkyWEcxaWpmWUdJOVVaeVZJV3kzZ3lSem43ckNUVFlSSHo5MkljeXlZenJ2VXNDeStYcUsxa1VNQTlUTmhwaHJPVmsxYUJWRTJjcm41MUlZYWpWWEl1NFFiUGFBMWtJanVzMUVjY2hqejZrdVRaMEVXeWdYYUh3MGt1UW0rNWxCbVZBYnpzQWhRN2NjQmxBa2UyUnQ3dmRibHFWUkhXWEl1Slc1SVAyaytHYXE5YlBDZ0FaK0xTUUxhdm5scVlvWGZtVk1URGJQa0RsZi8wWVRvbnF3QmFrK2hCVjA3WVNQb1FwZ3hQTUFkUWU1bWhwbE9hemE2MDFjZXNVVTFJb0s1S2FqWFhyeU10T2xZTVVLRlFBcEN2SVg3Rk5DVGtLcGlxOFRyYkFGM20rNmg4RG9JUklVNGNEM0RpUWNBcFBHT3hLQ0VLRnRzMXQ3aHRBRlF2RW0rdTYwYVorVS9xVG1XMHVYTUthWHhxaW03eW0zWGs4QUgvYW9ZVEdSaEh4azRSWXNIcUhJSS9EakhKSmhNR2xSbzMwaXAzbkVBSEdQaXlQZWFuZjBYUk4rRUZxNzdXMXcyT3lnQWFQTWlPZllXTVFTSWFBVjlxSkl2cGlPTTFzVm41OUNoWmgxNndiMDFuZ3owb1hvZCthRXQ4WUs3Unh3aENRSXRCMTc2YUxuYXVXdnJkL0JmdTN3cmFFWDg0UGN6emRaNlJ5QkNZaHk3Q1JEY3UzQ29rS3pyL3NrWE5GaGNRRlRHaTAvWnhteVM3VHloakMySjdmNi9KUys4VmpIb3hPak0yRDlaWElTS2dURzQ0RHIyUlRNOHM3b21EVlZpQy9yUGVBT25DUXM5ZGljLzF6bDRvYXc2ZnpYdEROVDVlTVc3eDlORjRoTm8zRHFQSjVoSmtDSE5yc2R5UnFsdDVKeGtFK1NrdHlDc0JyM09YTXJzTnVxOWdiWlVlVndsM09hWXJ2bHB6dU5jSjhJc2NkTkJRdUlpZEFXR1dJUEd5VnlBNUlnTzB4NDhQMUM3ZVRITmoxWE04MXVtZ2NkRUVKUlR1RFVpMWVHNFU0RUs3MXY0dUxiMDJFdWw1WXNUL2hxTmdVUzdvNkluMWlrYnpGTFlTTWluZlVDNUlFeE1ZTWdTM1NqSGFHVG1UQUdEa0dPYnFvemJSZk5zV3NHcUcvbmtWZGxGTlZiZm9jYnhvWkFhQ0VGbmQxV2F0QWVCVzZCYnZ6YzBpNE1HM2tiUHRubVF3bjRSMFAvQm1FT0VZUEpSbXJySU1LUm05eXk5RUVCV0dkelllcVRrN0d2QlNoVUNuVkdNWkN5QUxJY05tSzFtaFNiYUwvc3lLVm9nMS9pVmdCZFk3OFdQTG40bXhENmN5dz09IiwibWFjIjoiNmY1YzAxMjM1YzUwYTVlMTlhZTcyMGM5Y2Q3NzkwMmFlMDFiMTc0NDk4N2IzM2RmNmE1MTA3ZWI5M2U4Njg5OSIsInRhZyI6IiJ9');
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


describe('auto color mode', () => {
  before(() => {
    html = loadFixture('github_auto.html');
  });

  describe('colorMode', () => {
    it('should return the auto color mode', () => {
      expect(dom.colorMode()).to.equal('auto');
    });
  });
});

describe('dark color mode', () => {
  before(() => {
    html = loadFixture('github_dark.html');
  });

  describe('colorMode', () => {
    it('should return the dark color mode', () => {
      expect(dom.colorMode()).to.equal('dark');
    });
  });
});

describe('light color mode', () => {
  before(() => {
    html = loadFixture('github_light.html');
  });

  describe('colorMode', () => {
    it('should return the light color mode', () => {
      expect(dom.colorMode()).to.equal('light');
    });
  });
});

describe('line by line comparison view', () => {
  describe('diffMode', () => {
    before(() => {
      html = loadFixture('github_line_by_line.html');
    });

    it('should return the line by line diff mode', () => {
      expect(dom.diffMode()).to.equal('line-by-line');
    });
  });
});

describe('side by side comparison view', () => {
  describe('diffMode', () => {
    before(() => {
      html = loadFixture('github_side_by_side.html');
    });

    it('should return the side by side diff mode', () => {
      expect(dom.diffMode()).to.equal('side-by-side');
    });
  });
});
