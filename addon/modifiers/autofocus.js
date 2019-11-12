import { modifier } from 'ember-modifier';

export default modifier(function autofocus(element, [selector = 'input:not([disabled])']) {
  const childElement = element.querySelector(selector);

  if (childElement) {
    childElement.focus();
  } else {
    element.focus();
  }
});
