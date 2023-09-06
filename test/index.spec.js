import * as core from '../src/core';

describe('registering location observer', () => {
  let addLocationObserver, observerCallback;

  before(() => {
    addLocationObserver = sinon.replace(core, 'addLocationObserver', sinon.fake());
    observerCallback =  sinon.replace(core, 'observerCallback', sinon.fake());
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should register location observer', () => {
    require('../src/index');

    expect(addLocationObserver.firstArg).to.equal(observerCallback);
  });

  it('should call observerCallback', () => {
    require('../src/index');

    expect(observerCallback.callCount).to.equal(1);
  });
})
