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

  describe('aes-128-cbc cipher', () => {
    const key = 'base64:wvHF+ZSNJ/HaOmwnla5aug==';
    const env = 'eyJpdiI6Ilk4SWZmUUk3VzRhQXBZZC9hWitTNHc9PSIsInZhbHVlIjoiempoS2kzd0NpbDAvQzNnbk5OVUpUQT09IiwibWFjIjoiYmM1OTc3ZmQ3Y2JiYTIwMjc4NmQ2MTAzZTI1YmViMDkxMWMzODc3NmY2YmNkZGFkMjY3ZjQ1NmUxNWRiYmIyMCIsInRhZyI6IiJ9';

    it('decrypts encrypted .env', async () => {
      const decryptedEnv = await decryptEnv(env, key);

      expect(decryptedEnv).to.equal('FOO=bar\n');
    });
  });

  describe('aes-256-cbc cipher', () => {
    const key = 'base64:shdwLBVTvagCLqVXjo4EKS1aerccrKz3LTZT8/2wBVw=';
    const env = 'eyJpdiI6ImEwclNyQ3E3a3p2RytKWVIrQjRPeVE9PSIsInZhbHVlIjoiQWVWb3pCVUoxSWdPRm5RMVg5aDEyUT09IiwibWFjIjoiMTdmNDRmYTU5ZGI3OTJlYzllY2U4NDZmMGQ0NTNjYzRiMmY4ZDAxOTE4ZmRlZGNkMWJhNzgyODA3MGEyMTg2ZCIsInRhZyI6IiJ9';

    it('decrypts encrypted .env', async () => {
      const decryptedEnv = await decryptEnv(env, key);

      expect(decryptedEnv).to.equal('FOO=bar\n');
    });
  });
});

describe('trimEnv', () => {
  it('removes formatting from decrypted .env', () => {
    const env = `s:5:"FOO=1";`;

    expect(trimEnv(env)).to.equal('FOO=1');
  });
});
