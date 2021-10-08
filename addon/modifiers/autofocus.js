import { modifier } from 'ember-modifier';

const DEFAULT_SELECTOR = 'input:not([disabled]),textarea:not([disabled])';

export default modifier(function autofocus(element, [selector = DEFAULT_SELECTOR], { disabled}) {
  if (disabled) {
    return;
  }
  
  const childElement = element.querySelector(selector);

  if (childElement) {
    childElement.focus();
  } else {
    element.focus();
  }
});
