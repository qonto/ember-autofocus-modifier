import { render } from '@ember/test-helpers';
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
        <button data-test-button>this is a button</button>
        <input data-test-input-1 />
        <input data-test-input-2 />
        <input data-test-input-3 />
      </div>
    `);

    assert.dom('[data-test-input-1]').isFocused('The first input is focused');
  });

  test('should focus the first included input that is not disabled', async function (assert) {
    await render(hbs`
      <div {{autofocus}}>
        <span>this is not a focusable element</span>
        <button data-test-button>this is a button</button>
        <input data-test-input-1 disabled />
        <input data-test-input-2 disabled />
        <input data-test-input-3 />
      </div>
    `);

    assert
      .dom('[data-test-input-3]')
      .isFocused('The first enabled input is focused');
  });

  test('should focus the root element if no children are found', async function (assert) {
    await render(hbs`
      <input data-test-input {{autofocus}} />
    `);

    assert.dom('[data-test-input]').isFocused('The root input is focused');
  });

  test('should not focus inputs not related to the autofocused node', async function (assert) {
    await render(hbs`
      <div>
        <div {{autofocus}}>
          <span>this is not a focusable element</span>
        </div>
        <button data-test-button>this is a button</button>
        <input data-test-input-1 />
        <input data-test-input-2 />
        <input data-test-input-3 />
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
          <input data-test-input-1 />
          <input data-test-input-2 />
          <button data-test-button>this is a button</button>
          <input data-test-input-3 />
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
          <button data-test-button>this is a button</button>
          <div>
            <input {{autofocus}} data-test-input-1 />
            <input {{autofocus}} data-test-input-2 />
            <input {{autofocus}} data-test-input-3 />
          </div>
          <input {{autofocus}} data-test-input-4 />
          <input {{autofocus}} data-test-input-5 />
          <input {{autofocus}} data-test-input-6 />
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
        <textarea data-test-textarea="disabled" disabled />
        <textarea data-test-textarea="enabled" />
        <input data-test-input="enabled" />
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
        <button data-test-button>this is a button</button>
        <input data-test-input-1 />
        <input data-test-input-2 />
        <input data-test-input-3 />
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
        <button data-test-button>this is a button</button>
        <input data-test-input-1 />
        <input data-test-input-2 />
        <input data-test-input-3 />
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
        <button data-test-button>this is a button</button>
        <input data-test-input-1 />
        <input data-test-input-2 />
        <input data-test-input-3 />
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
      <button
        {{on "focus" this.updateBar}}
        ...attributes
      >
        Foo: {{this.bar}}
      </button>
    `,
      FooButtonComponent
    );
    this.FooButton = FooButtonComponent;

    await render(hbs`
      <div {{autofocus "input,button"}}>
        <span>this is not a focusable element</span>
        <this.FooButton data-test-foo/>
        <input data-test-input-1 />
      </div>
    `);

    assert.dom('[data-test-foo]').isFocused('The button element is focused');
    assert
      .dom('[data-test-input-1]')
      .isNotFocused('The first non related input is not focused');
  });
});
