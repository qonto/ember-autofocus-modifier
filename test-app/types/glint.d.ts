import '@glint/environment-ember-loose';
import type AutofocusRegistry from 'ember-autofocus-modifier/template-registry';
import type FooButton from 'test-app/components/foo-button';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends AutofocusRegistry {
    FooButton: typeof FooButton;
  }
}
