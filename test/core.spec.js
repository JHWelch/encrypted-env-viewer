import { observerCallback } from '../src/core';
import { loadFixture } from './support/helpers';
import * as helpers from '../src/helpers';
import * as env_viewer from '../src/env_viewer';

var chai = require('chai');
chai.use(require('sinon-chai'));

describe('initEnvViewer', () => {
  let html;

  before(() => {
    html = loadFixture('github_pr.html');
  });

  beforeEach(() => {
    global.document = new window.DOMParser().parseFromString(html, 'text/html');
  });

  it('adds a button to the page with correct attributes', () => {
    env_viewer.initEnvViewer();

    const button = document.querySelector('[data-test="decrypt-env"]');

    expect(button).to.exist;
    expect(button.classList.contains('btn')).to.be.true;
    expect(button.classList.contains('btn-sm')).to.be.true;
    expect(button.classList.contains('btn-secondary')).to.be.true;
    expect(button.classList.contains('ml-2')).to.be.true;
    expect(button.innerHTML).to.equal('Decrypt');
  });
});

describe('observerCallback', () => {
  before(() => {
    sinon.replace(helpers, 'sleep', () => Promise.resolve());
    sinon.replace(env_viewer, 'initEnvViewer', sinon.fake());
  });

  after(() => {
    sinon.restore();
  });

  describe('when the url matches', () => {
    let originalWindow;

    beforeEach(() => {
      originalWindow = global.window;
      global.window = { location: { href: 'https://github.com' } };
    });

    afterEach(() => {
      global.window = originalWindow;
    });

    it('calls initEnvViewer', async () => {
      await observerCallback();

      expect(env_viewer.initEnvViewer).to.have.been.called;
    });
  });
});
