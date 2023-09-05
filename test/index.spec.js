import * as helpers from '../src/helpers';

describe('registering location observer', () => {
  let addLocationObserver, observerCallback;

  before(() => {
    addLocationObserver = sinon.replace(helpers, 'addLocationObserver', sinon.fake());
    observerCallback =  sinon.replace(helpers, 'observerCallback', sinon.fake());
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
