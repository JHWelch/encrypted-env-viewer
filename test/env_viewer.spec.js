import { decryptButtonCallback, initEnvViewer } from '../src/env_viewer';
import { loadFixture } from './support/helpers';
import * as decrypt from '../src/decrypt';
import dom from '../src/dom';
import * as diff from '../src/diff';

const decryptButton = () => document.querySelector('[data-test="decrypt-env"]');

describe('initEnvViewer', () => {
  let html;

  before(() => {
    html = loadFixture('github_pr.html');
  });

  beforeEach(() => {
    global.document = new window.DOMParser().parseFromString(html, 'text/html');
  });

  it('adds a button to the page with correct attributes', () => {
    initEnvViewer();

    const button = decryptButton();

    expect(button).to.exist;
    expect(button.classList.contains('btn')).to.be.true;
    expect(button.classList.contains('btn-sm')).to.be.true;
    expect(button.classList.contains('btn-secondary')).to.be.true;
    expect(button.classList.contains('ml-2')).to.be.true;
    expect(button.innerHTML).to.equal('Decrypt');
  });

  describe('when the button is clicked', () => {
    let prompt, decryptEnv;

    beforeEach(() => {
      prompt = sinon.stub(global, 'prompt').returns('key');
      decryptEnv = sinon.stub(decrypt, 'decryptEnv').resolves(['left', 'right']);
      initEnvViewer();
    });

    afterEach(() => {
      sinon.restore();
      prompt.restore();
      decryptEnv.restore();
    });

    it('prompts for a key', () => {
      decryptButton().click();

      expect(prompt).to.have.been.calledWith('Enter encryption key');
    });

    describe('key is empty', () => {
      beforeEach(() => {
        prompt.returns('');
      });

      it('does not decrypt the envs', () => {
        decryptButton().click();

        expect(decryptEnv).to.not.have.been.called;
      });
    });

    it('decrypts the left and right envs', () => {
      decryptButton().click();

      expect(decryptEnv).to.have.been.calledWith(
        'eyJpdiI6IkhTYTRJdUx0dUQyTnBaRG1sTkMySHc9PSIsInZhbHVlIjoieDJXTmNkVmkyeVg1Qmg5b1VDUGVCdz09IiwibWFjIjoiN2NiNTdkZWY4YjBlZmFmNTdkYjJhZWU5NTQyNjIwNGNiYmZjNGVmZTYxNjA5NDQxNDVlYWFiNzhkYjBkODEzYyIsInRhZyI6IiJ9',
        'key',
      );
      expect(decryptEnv).to.have.been.calledWith(
        'eyJpdiI6Im9mTWdTOUpyajB3Z1B4SmpXR0cvaHc9PSIsInZhbHVlIjoiRVRrMlVjYmtTU25TOWpOOVNiSkFFejRTMTlrbXJ0emdJelZoSHREMXBKND0iLCJtYWMiOiJkNzJiYzhjMWMzNjc5MDNmYjFmN2M5N2U3NWQyOWVmZjY5YzgwMDA4NmZhOTIyYTAyMWNkYmYyNDQwMTFmNjQ1IiwidGFnIjoiIn0=',
        'key',
      );
    });

    // TODO get test to pass, does not wait for promise to resolve.
    // it('removes itself from the page', async () => {
    //   decryptButton().click();

    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   expect(decryptButton()).to.not.exist;
    // });
  });
});

describe('decryptButtonCallback', () => {
  const fileDiv = { fileDiv: true };

  let
    addNewDiff,
    decryptEnv,
    diffHtml,
    event,
    prompt;

  beforeEach(() => {
    addNewDiff = sinon.stub(dom, 'addNewDiff');
    decryptEnv = sinon.stub(decrypt, 'decryptEnv');
    decryptEnv.withArgs('left', 'key').resolves('leftDecrypted');
    decryptEnv.withArgs('right', 'key').resolves('rightDecrypted');
    diffHtml = sinon.stub(diff, 'diffHtml').returns('diffHtml')
    event = { target: { remove: sinon.stub() } };
    prompt = sinon.stub(global, 'prompt').returns('key');
  });

  afterEach(() => {
    sinon.restore();
    addNewDiff.restore();
    decryptEnv.restore();
    diffHtml.restore();
    prompt.restore();
  });

  it('prompts for a key', () => {
    decryptButtonCallback(event, fileDiv, 'left', 'right');

    expect(prompt).to.have.been.calledWith('Enter encryption key');
  });

  describe('key is empty', () => {
    beforeEach(() => {
      prompt.returns('');
    });

    it('does not decrypt the envs', () => {
      decryptButtonCallback(event, fileDiv, 'left', 'right');

      expect(decryptEnv).to.not.have.been.called;
    });
  });

  it('decrypts the left and right envs', () => {
    decryptButtonCallback(event, fileDiv, 'left', 'right');

    expect(decryptEnv).to.have.been.calledWith('left', 'key');
    expect(decryptEnv).to.have.been.calledWith('right', 'key');
  });

  it('adds a new diff to the page', async () => {
    await decryptButtonCallback(event, fileDiv, 'left', 'right');

    expect(diffHtml).to.have.been.calledWith('leftDecrypted', 'rightDecrypted');
    expect(addNewDiff).to.have.been.calledWith(fileDiv, 'diffHtml');
  });

  it('removes the button from the page', async () => {
    await decryptButtonCallback(event, fileDiv, 'left', 'right');

    expect(event.target.remove).to.have.been.called;
  });
});
