import { modifier } from 'ember-modifier';
import { next } from '@ember/runloop';

const DEFAULT_SELECTOR =
  'input:not([disabled]):not([readonly]),textarea:not([disabled]):not([readonly])';

export default modifier(
  function autofocus(element, [selector = DEFAULT_SELECTOR], { disabled }) {
    if (disabled) {
      return;
    }

    const childElement = element.querySelector(selector);

    next(function () {
      if (childElement) {
        childElement.focus();
      } else {
        element.focus();
      }
    });
  },
  { eager: false }
);
