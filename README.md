![ember-autofocus-modifier-illustration](https://user-images.githubusercontent.com/15218861/189953191-49028e3e-6627-4e3d-9945-70800a6f3d0b.svg)

# ember-autofocus-modifier

Your ember component has just been rendered. Have you ever wanted to focus an
element in the DOM right after that? Like focusing this lonely input on your
page? Or like focusing a full-screen modal's close button?

This package wraps a modifier to autofocus an element in the DOM. It works for
inputs and for other elements.

As an alternative to installing this package, you might want to consider using
[this snippet](https://github.com/qonto/ember-autofocus-modifier/blob/v0.0.1/addon/modifiers/autofocus.js).

## Usage

By default, it will search for the first non-disabled input in the dom node that it has been attached to.

You can specify a custom selector to target other element as the first positional parameter.

If no child is found, then it will try to focus the element itself.

## Examples

#### To set the autofocus to an ember component:

```handlebars
<MyComponent {{autofocus}} />
```

#### To set the autofocus to a native html element:

```handlebars
<input {{autofocus}} />
```

#### To set the autofocus to the first focusable input of an html container:

Here, `#input-2` will be focused as `input-1` is disabled:

```handlebars
<form {{autofocus}}>
  <input id="input-1" disabled="disabled" />
  <input id="input-2" />
  <button type="submit" />
</form>
```

#### To set the autofocus to something else than an input in a node's children:

Here, the autofocus will be applied to the button

```handlebars
<form {{autofocus "button"}}>
  <input />
  <input />
  <button type="submit" />
</form>
```

#### If the autofocus is applied multiple times, the latest element will be auto-focused:

Here, the autofocus will be applied to the button

```handlebars
<form>
  <input {{autofocus}} />
  <input {{autofocus}} />
  <button {{autofocus}} type="submit" />
</form>
```

## Installation

```
yarn add -D ember-autofocus-modifier
```

or

```
npm install --save-dev ember-autofocus-modifier
```

## Compatibility

- Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v18 or above
- TypeScript v5.0 or above

## TypeScript usage

The `autofocus` helper has proper [Glint](https://github.com/typed-ember/glint) types, which allow you to get strict type checking in your templates when using TypeScript.

Unless you are using [strict mode](http://emberjs.github.io/rfcs/0496-handlebars-strict-mode.html) templates (via [first class component templates](http://emberjs.github.io/rfcs/0779-first-class-component-templates.html)),
you need to import the addon's Glint template registry entries as described in the [Using Addons](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) documentation:

```ts
// e.g. types/glint.d.ts
import "@glint/environment-ember-loose";
import type AutofocusRegistry from "ember-autofocus-modifier/template-registry";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry
    extends AutofocusRegistry /* other addon registries */ {
    // local entries
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
