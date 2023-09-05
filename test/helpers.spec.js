import { decryptEnv, sleep, trimEnv } from "../src/helpers";

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
