import { modifier } from 'ember-modifier';
import { next } from '@ember/runloop';

const focusableElements = [
  'BUTTON',
  'SUMMARY',
  'IFRAME',
  'INPUT',
  'SELECT',
  'TEXTAREA',
];

const DEFAULT_SELECTOR =
  'input:not([disabled]):not([readonly]),textarea:not([disabled]):not([readonly])';

export default modifier(
  function autofocus(element, [selector = DEFAULT_SELECTOR], { disabled }) {
    if (disabled) {
      return;
    }

    // Instead of selecting a child element by default, should this (in a major),
    // be a behavior that is changed via a passed flag?
    const targetElement = element.querySelector(selector) || element;
    const isChildElement = targetElement !== element;

    /**
     * Only applies to the element that {{autofocus}} is applied to.
     * opts-out if we're selecting a child element.
     */
    const shouldMoveFocus =
      !isChildElement &&
      !focusableElements.some(
        (item) =>
          element.tagName === item ||
          element.isContentEditable ||
          element.hasAttribute('aria-disabled') ||
          element.hasAttribute('href') ||
          element.hasAttribute('tabindex')
      );

    /**
     * if {{autofocus}} is applied to a non-focusable element,
     * For A11y purposes, this is used to move focus to the non-focusable element.
     * This is helpful when new elements are inserted on to the screen (yet not focus-trapped),
     * and we want the tab-behavior to move "near" the inserted content.
     *
     * This still prevents the non-focusable element from being tabbed to, as non-focusable
     * elements are still not focusable.
     *
     * But this is a behavior we can use to help out screen readers and keyboard users alike to
     * more smoothly interact with newly-inserted content (without needing to focus an interactive-specifically
     * maybe the inserted contents are just buttons, for example).
     */
    if (shouldMoveFocus) {
      element.setAttribute('tabindex', '-1');
    }

    next(function () {
      targetElement.focus();
    });

    return () => {
      if (shouldMoveFocus) {
        element.removeAttribute('tabindex');
      }
    };
  },
  { eager: false }
);
