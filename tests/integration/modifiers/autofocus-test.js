import { find, render, tab } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { setComponentTemplate } from '@ember/component';
import { action } from '@ember/object';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | autofocus', function (hooks) {
  setupRenderingTest(hooks);

  test('should focus the first included input', async function (assert) {
    await render(hbs`
      <div {{autofocus}}>
        <span>this is not a focusable element</span>
        <button type="button" data-test-button>this is a button</button>
        <input id="1" data-test-input-1 />
        <input id="2" data-test-input-2 />
        <input id="3" data-test-input-3 />
      </div>
    `);

    assert.dom('[data-test-input-1]').isFocused('The first input is focused');
  });

  test('should focus the first included input that is not disabled', async function (assert) {
    await render(hbs`
      <div {{autofocus}}>
        <span>this is not a focusable element</span>
        <button type="button" data-test-button>this is a button</button>
        <input id="1" data-test-input-1 disabled />
        <input id="2" data-test-input-2 disabled />
        <input id="3" data-test-input-3 />
      </div>
    `);

    assert
      .dom('[data-test-input-3]')
      .isFocused('The first enabled input is focused');
  });

  test('should focus the first included input that is not readonly', async function (assert) {
    await render(hbs`
      <div {{autofocus}}>
        <span>this is not a focusable element</span>
        <button type="button" data-test-button>this is a button</button>
        <input id="1" data-test-input-1 readonly />
        <input id="2" data-test-input-2 readonly />
        <input id="3" data-test-input-3 />
      </div>
    `);

    assert
      .dom('[data-test-input-3]')
      .isFocused('The first enabled input is focused');
  });

  test('should focus the root element if no children are found', async function (assert) {
    await render(hbs`
      <input id="1" data-test-input {{autofocus}} />
    `);

    assert.dom('[data-test-input]').isFocused('The root input is focused');
  });

  test('should not focus inputs not related to the autofocused node', async function (assert) {
    await render(hbs`
      <div>
        <div {{autofocus}}>
          <span>this is not a focusable element</span>
        </div>
        <button type="button" data-test-button>this is a button</button>
        <input id="1" data-test-input-1 />
        <input id="2" data-test-input-2 />
        <input id="3" data-test-input-3 />
      </div>
    `);

    assert
      .dom('[data-test-input-1]')
      .isNotFocused('The first non related input are not focused');
    assert
      .dom('[data-test-input-2]')
      .isNotFocused('The second non related input are not focused');
    assert
      .dom('[data-test-input-3]')
      .isNotFocused('The third non related input are not focused');
  });

  test('should focus element according to a custom selector if given', async function (assert) {
    await render(hbs`
      <div>
        <div {{autofocus "button"}}>
          <span>this is not a focusable element</span>
          <input id="1" data-test-input-1 />
          <input id="2" data-test-input-2 />
          <button type="button" data-test-button>this is a button</button>
          <input id="3" data-test-input-3 />
        </div>
      </div>
    `);

    assert
      .dom('[data-test-button]')
      .isFocused('The custom selected element is focused');
  });

  test('should focus the last element of the tree if the modifier is affected multiple times', async function (assert) {
    await render(hbs`
      <div>
        <div>
          <span>this is not a focusable element</span>
          <button type="button" data-test-button>this is a button</button>
          <div>
            <input id="1" {{autofocus}} data-test-input-1 />
            <input id="2" {{autofocus}} data-test-input-2 />
            <input id="3" {{autofocus}} data-test-input-3 />
          </div>
          <input id="4" {{autofocus}} data-test-input-4 />
          <input id="5" {{autofocus}} data-test-input-5 />
          <input id="6" {{autofocus}} data-test-input-6 />
        </div>
      </div>
    `);

    assert
      .dom('[data-test-input-6]')
      .isFocused('The custom selected element is focused');
  });

  test('should give focus to the first included textarea that is not disabled', async function (assert) {
    await render(hbs`
      <form {{autofocus}}>
        <textarea id="1" data-test-textarea="disabled" disabled />
        <textarea id="2" data-test-textarea="enabled" />
        <input id="3" data-test-input="enabled" />
      </form>
    `);

    assert
      .dom('[data-test-textarea="enabled"]')
      .isFocused('The first enabled textarea is focused');
  });

  test('should give focus to the first included textarea that is not readonly', async function (assert) {
    await render(hbs`
      <form {{autofocus}}>
        <textarea id="1" data-test-textarea="readonly" readonly />
        <textarea id="2" data-test-textarea="enabled" />
        <input id="3" data-test-input="enabled" />
      </form>
    `);

    assert
      .dom('[data-test-textarea="enabled"]')
      .isFocused('The first enabled textarea is focused');
  });

  test('should not focus due to disabled parameter set to true providing a selector', async function (assert) {
    await render(hbs`
      <div {{autofocus 'input:not([disabled])' disabled=true}}>
        <span>this is not a focusable element</span>
        <button type="button" data-test-button>this is a button</button>
        <input id="1" data-test-input-1 />
        <input id="2" data-test-input-2 />
        <input id="3" data-test-input-3 />
      </div>
    `);

    assert
      .dom('[data-test-button]')
      .isNotFocused('The button element is not focused');
    assert
      .dom('[data-test-input-1]')
      .isNotFocused('The first non related input are not focused');
    assert
      .dom('[data-test-input-2]')
      .isNotFocused('The second non related input are not focused');
    assert
      .dom('[data-test-input-3]')
      .isNotFocused('The third non related input are not focused');
  });

  test('should not focus due to disabled parameter set to true without providing a selector', async function (assert) {
    await render(hbs`
      <div {{autofocus disabled=true}}>
        <span>this is not a focusable element</span>
        <button type="button" data-test-button>this is a button</button>
        <input id="1" data-test-input-1 />
        <input id="2" data-test-input-2 />
        <input id="3" data-test-input-3 />
      </div>
    `);

    assert
      .dom('[data-test-button]')
      .isNotFocused('The button element is not focused');
    assert
      .dom('[data-test-input-1]')
      .isNotFocused('The first non related input are not focused');
    assert
      .dom('[data-test-input-2]')
      .isNotFocused('The second non related input are not focused');
    assert
      .dom('[data-test-input-3]')
      .isNotFocused('The third non related input are not focused');
  });

  test('should focus due to disabled parameter set to false', async function (assert) {
    await render(hbs`
      <div {{autofocus disabled=false}}>
        <span>this is not a focusable element</span>
        <button type="button" data-test-button>this is a button</button>
        <input id="1" data-test-input-1 />
        <input id="2" data-test-input-2 />
        <input id="3" data-test-input-3 />
      </div>
    `);

    assert
      .dom('[data-test-input-1]')
      .isFocused('The first non related input are not focused');
    assert
      .dom('[data-test-button]')
      .isNotFocused('The button element is not focused');
    assert
      .dom('[data-test-input-2]')
      .isNotFocused('The second non related input are not focused');
    assert
      .dom('[data-test-input-3]')
      .isNotFocused('The third non related input are not focused');
  });

  test('should not cause rerender assertions on Glimmer components when a focus modifier is present', async function (assert) {
    class FooButtonComponent extends Component {
      @tracked bar;

      @action
      updateBar() {
        this.bar = !this.bar;
      }
    }
    setComponentTemplate(
      hbs`
      <button type="button"
        {{on "focus" this.updateBar}}
        ...attributes
      >
        Foo: {{this.bar}}
      </button>
    `,
      FooButtonComponent
    );
    this.owner.register('component:foo-button', FooButtonComponent);

    await render(hbs`
      <div {{autofocus "input,button"}}>
        <span>this is not a focusable element</span>
        <FooButton data-test-foo/>
        <input id="1" data-test-input-1 />
      </div>
    `);

    assert.dom('[data-test-foo]').isFocused('The button element is focused');
    assert
      .dom('[data-test-input-1]')
      .isNotFocused('The first non related input is not focused');
  });

  module('A11y-specific behaviors', function () {
    test('non-focusable elements may be focused', async function (assert) {
      await render(hbs`<div {{autofocus}}></div>`);

      assert.dom('div').isFocused();
      assert.dom('div').hasAttribute('tabindex', '-1');
    });

    test('non-focusable {{autofocus}} elements are still omitted from tabbing', async function (assert) {
      await render(hbs`
        <div {{autofocus}}></div>
        <button id="a" type="button"></button>
        <button id="b" type="button"></button>
      `);

      assert.dom('div').isFocused();

      await tab();
      assert.dom('div').isNotFocused();
      assert.dom('#a').isFocused();

      await tab();
      assert.dom('#a').isNotFocused();
      assert.dom('#b').isFocused();

      await tab();
      assert.dom('#a').isNotFocused();
      assert.dom('div').isNotFocused();

      await tab({ backwards: true });
      assert.dom('#b').isFocused();
      assert.dom('div').isNotFocused();

      await tab({ backwards: true });
      assert.dom('#b').isNotFocused();
      assert.dom('#a').isFocused();
      assert.dom('div').isNotFocused();

      await tab({ backwards: true });
      assert.dom('#a').isNotFocused();
      assert.dom('div').isNotFocused();
    });

    test('tabindex isnt added to already focusable elements', async function (assert) {
      let assertElement = (element) => {
        let elem = find(element);

        assert.dom(elem).isFocused();
        assert.dom(elem).doesNotHaveAttribute('tabindex');
      };

      await render(
        hbs`<button type="button" aria-disabled="true" {{autofocus}}></button>`
      );
      assertElement('[aria-disabled]');

      await render(hbs`<button type="button" {{autofocus}}></button>`);
      assertElement('button');

      await render(hbs`
        <details>
          <summary {{autofocus}}></summary>
        </details>
      `);
      assertElement('summary');

      await render(hbs`<iframe title="title" {{autofocus}}></iframe>`);
      assertElement('iframe');

      await render(hbs`<input id="1" {{autofocus}} />`);
      assertElement('input');

      await render(hbs`<select id="1" {{autofocus}}></select>`);
      assertElement('select');

      await render(hbs`<textarea id="1" {{autofocus}}></textarea>`);
      assertElement('textarea');

      await render(hbs`<a href {{autofocus}}>link</a>`);
      assertElement('[href]');

      await render(hbs`<div contenteditable {{autofocus}}></div>`);
      assertElement('[contenteditable]');
    });
    test('it respects existing tabindex', async function (assert) {
      await render(hbs`<div tabindex="0" {{autofocus}}></div>`);

      assert.dom('div').isFocused();
      assert.dom('div').hasAttribute('tabindex', '0');
    });
  });
});
