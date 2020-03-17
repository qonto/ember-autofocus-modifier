import { modifier } from 'ember-modifier';

export default modifier(function autofocus(element, [selector = 'input:not([disabled])']) {
  let elementToFocus = element;
  if (typeof selector === 'string') {
    const childElement = element.querySelector(selector);
    if (childElement) {
      elementToFocus = childElement;
    }
  } else if (selector) {
    // assume it is an Element, could check if instanceof Element, but not sure about compatibility
    elementToFocus = selector;
  }
  elementToFocus.focus();
});
