import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { expect } from 'chai';
import { LitElement } from 'lit-element';

let count = 0;
[HTMLElement, LitElement].forEach((BaseClass) => {
  describe(BaseClass === HTMLElement ? 'HTMLElement' : 'LitElement', () => {
    it.only('has working addEventListener on <parent-element disabled> in IE11', async () => {
      // setup spy
      let spyCalled = false;
      function spy() {
        spyCalled = true;
      }

      // register parent element CE
      count += 1;
      customElements.define(
        `parent-element-${count}`,
        class extends BaseClass {
          constructor() {
            super();
            this.addEventListener('notify-parent-element', spy);
          }
        },
      );

      // create fixture
      const fixtureWrapper = document.createElement('div');
      document.body.appendChild(fixtureWrapper);
      fixtureWrapper.innerHTML = `
        <parent-element-${count} disabled>
          <div></div>
        </parent-element-${count}>
      `;

      // get parent & child
      const parent = fixtureWrapper.children[0];
      const child = parent.querySelector('div');

      // dispatch event
      child.dispatchEvent(
        new CustomEvent('notify-parent-element', {
          detail: { element: child },
          bubbles: true,
        }),
      );

      // test
      expect(spyCalled).to.equal(true);
    });
  });
});
