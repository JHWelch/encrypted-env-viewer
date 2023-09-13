import { decryptEnv, trimEnv } from "../src/decrypt";

describe('decryptEnv', () => {
  describe('key has base64: prefix', () => {
    const env = 'eyJpdiI6IkhTYTRJdUx0dUQyTnBaRG1sTkMySHc9PSIsInZhbHVlIjoieDJXTmNkVmkyeVg1Qmg5b1VDUGVCdz09IiwibWFjIjoiN2NiNTdkZWY4YjBlZmFmNTdkYjJhZWU5NTQyNjIwNGNiYmZjNGVmZTYxNjA5NDQxNDVlYWFiNzhkYjBkODEzYyIsInRhZyI6IiJ9';

    it('decrypts encrypted .env', async () => {
      const key = 'base64:CmbKE020myBzieJd8JZtJRSPok9536pSzsGip6PCpuI=';
      const decryptedEnv = await decryptEnv(env, key);

      expect(decryptedEnv).to.equal('FOO=bar\n');
    });
  });

  describe('key has no prefix', () => {
    const env = 'eyJpdiI6ImwyMEFOSjJTSVgvbmIxWHRsVnkvSVE9PSIsInZhbHVlIjoiTU93dE40Rk1EQXZPU2diZzB1K0dWdz09IiwibWFjIjoiODFlNGFkYmNiNjFkNzg5MTllNDBhODQzMzcwZDBjMDQ4ZmUzOWNmNzcwMTcxNGY5OWFlZDc3ZWY4YzI1OWY2ZCIsInRhZyI6IiJ9';

    it('decrypts encrypted .env', async () => {
      const key = 'it3Ms9BFfKYr6jQFmHRkZg14JD7pDZkH';
      const decryptedEnv = await decryptEnv(env, key);

      expect(decryptedEnv).to.equal('FOO=bar\n');
    });
  });

  describe('when env is empty', () => {
    it('returns empty string', async () => {
      const decryptedEnv = await decryptEnv('', 'does not matter');

      expect(decryptedEnv).to.equal('');
    });
  });
});

describe('trimEnv', () => {
  it('removes formatting from decrypted .env', () => {
    const env = `s:5:"FOO=1";`;

    expect(trimEnv(env)).to.equal('FOO=1');
  });
});
