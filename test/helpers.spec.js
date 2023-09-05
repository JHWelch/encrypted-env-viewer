import { trimEnv } from "../src/helpers";

describe('trimEnv', () => {
    it('removes formatting from decrypted .env', () => {
        const env = `s:5:"FOO=1";`;

        expect(trimEnv(env)).to.equal('FOO=1');
    });
});
