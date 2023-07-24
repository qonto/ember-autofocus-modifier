import Modifier from 'ember-modifier';

declare module 'ember-autofocus-modifier/modifiers/autofocus' {
  export default class autofocus extends Modifier<{
    Args: { Positional: [selector?: string] };
    Element: Element;
  }> {}
}
