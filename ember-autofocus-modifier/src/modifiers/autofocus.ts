import { modifier } from "ember-modifier";
import { next } from "@ember/runloop";

const focusableElements = [
  "BUTTON",
  "SUMMARY",
  "IFRAME",
  "INPUT",
  "SELECT",
  "TEXTAREA",
] as const;

const DEFAULT_SELECTOR =
  "input:not([disabled]):not([readonly]),textarea:not([disabled]):not([readonly])";

interface ModifierArgs {
  Element: HTMLElement;
  Args: {
    Positional: [string?]; // Optional selector
    Named: {
      disabled?: boolean; // Optional 'disabled' parameter
    };
  };
}

const autofocus = modifier<ModifierArgs>(function autofocus(
  element: HTMLElement,
  [selector] = [DEFAULT_SELECTOR],
  { disabled } = { disabled: false },
) {
  if (disabled) {
    return;
  }

  const targetElement: HTMLElement =
    element.querySelector(selector ?? DEFAULT_SELECTOR) || element;
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
        element.hasAttribute("aria-disabled") ||
        element.hasAttribute("href") ||
        element.hasAttribute("tabindex"),
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
    element.setAttribute("tabindex", "-1");
  }

  next(function () {
    targetElement.focus();
  });

  return (): void => {
    if (shouldMoveFocus) {
      element.removeAttribute("tabindex");
    }
  };
});

export { autofocus as default, DEFAULT_SELECTOR as defaultSelector };
