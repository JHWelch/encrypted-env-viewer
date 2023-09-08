import { sleep } from '../src/helpers';

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
