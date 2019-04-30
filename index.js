import { expect } from 'chai';

mocha.checkLeaks();
mocha.setup('bdd');

(async function () {

  await import('./disabled.spec.js');
  mocha.run();

})();
