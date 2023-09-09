import { observerCallback } from '../src/core';
import * as helpers from '../src/helpers';
import * as env_viewer from '../src/env_viewer';

var chai = require('chai');
chai.use(require('sinon-chai'));

const setUrl = (url) => {
  global.window = { location: { href: url } };
};

describe('observerCallback', () => {
  let originalWindow;

  before(() => {
    sinon.replace(helpers, 'sleep', () => Promise.resolve());
    sinon.replace(env_viewer, 'initEnvViewer', sinon.fake());
  });

  after(() => {
    sinon.restore();
  });

  beforeEach(() => {
    originalWindow = global.window;
  });

  afterEach(() => {
    global.window = originalWindow;
    env_viewer.initEnvViewer.resetHistory();
  });

  describe('when the url matches PR path', () => {
    beforeEach(() => {
      setUrl('https://github.com/JHWelch/encrypted-env-viewer/pull/11/files');
    });

    it('calls initEnvViewer', async () => {
      await observerCallback();

      expect(env_viewer.initEnvViewer).to.have.been.called;
    });

    describe('called twice', () => {
      it('calls initEnvViewer once', async () => {
        await observerCallback();
        await observerCallback();

        expect(env_viewer.initEnvViewer).to.have.been.calledOnce;
      });
    });
  });

  describe('when the url is a comparison', () => {
    beforeEach(() => {
      setUrl('https://github.com/JHWelch/encrypted-env-viewer/compare/env...env-updated?expand=1');
    });

    it('calls initEnvViewer', async () => {
      await observerCallback();

      expect(env_viewer.initEnvViewer).to.have.been.called;
    });
  });

  describe('when the url is any other github page', () => {
    beforeEach(() => {
      setUrl('https://github.com/anything_else');
    });

    it('does not call initEnvViewer', async () => {
      await observerCallback();

      expect(env_viewer.initEnvViewer).to.not.have.been.called;
    });
  });
});
