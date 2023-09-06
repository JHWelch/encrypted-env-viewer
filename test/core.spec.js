import { initEnvViewer, sleep } from "../src/core";
import fs from 'fs';

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
