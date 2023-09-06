import { decryptEnv, initEnvViewer, sleep, trimEnv } from "../src/helpers";
import fs from 'fs';

describe('trimEnv', () => {
  it('removes formatting from decrypted .env', () => {
    const env = `s:5:"FOO=1";`;

    expect(trimEnv(env)).to.equal('FOO=1');
  });
});

describe('decryptEnv', () => {
  const env = 'eyJpdiI6IkhTYTRJdUx0dUQyTnBaRG1sTkMySHc9PSIsInZhbHVlIjoieDJXTmNkVmkyeVg1Qmg5b1VDUGVCdz09IiwibWFjIjoiN2NiNTdkZWY4YjBlZmFmNTdkYjJhZWU5NTQyNjIwNGNiYmZjNGVmZTYxNjA5NDQxNDVlYWFiNzhkYjBkODEzYyIsInRhZyI6IiJ9';

  it('decrypts encrypted .env', async () => {
    const key = 'base64:CmbKE020myBzieJd8JZtJRSPok9536pSzsGip6PCpuI=';
    const decryptedEnv = await decryptEnv(env, key);

    expect(decryptedEnv).to.equal('FOO=bar\n');
  });

  describe('when key is missing base64 prefix', () => {
    it('decrypts encrypted .env', async () => {
      const key = 'CmbKE020myBzieJd8JZtJRSPok9536pSzsGip6PCpuI=';
      const decryptedEnv = await decryptEnv(env, key);

      expect(decryptedEnv).to.equal('FOO=bar\n');
    });
  });
});

describe('sleep', () => {
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it('returns a promise that resolves after the given time', async () => {
    const callback = sinon.fake();

    sleep(1000).then(callback);

    expect(callback.notCalled).to.be.true;

    clock.tick(500);
    await Promise.resolve();
    expect(callback.notCalled).to.be.true;

    clock.tick(500);
    await Promise.resolve();

    expect(callback.callCount).to.equal(1);
  });
});

describe('initEnvViewer', () => {
  let html

  before('test1', function (done) {
    fs.readFile('./test/fixtures/github_pr.html', 'utf8', (err, data) => {
      if (err) throw err;
      html = data;
      done();
    });
  });

  beforeEach(() => {
    global.document = new window.DOMParser().parseFromString(html, 'text/html');
  });

  it('adds a button to the page with correct attributes', () => {
    initEnvViewer();

    const button = document.querySelector('[data-test="decrypt-env"]');

    expect(button).to.exist;
    expect(button.classList.contains('btn')).to.be.true;
    expect(button.classList.contains('btn-sm')).to.be.true;
    expect(button.classList.contains('btn-secondary')).to.be.true;
    expect(button.classList.contains('ml-2')).to.be.true;
    expect(button.innerHTML).to.equal('Decrypt');
  });
});
