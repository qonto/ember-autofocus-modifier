
![ember-autofocus-modifier-illustration](https://user-images.githubusercontent.com/15218861/189953191-49028e3e-6627-4e3d-9945-70800a6f3d0b.svg)

ember-autofocus-modifier
==============================================================================

Your ember component has just been rendered. Have you ever wanted to focus an
element in the DOM right after that? Like focusing this lonely input on your
page? Or like focusing a full-screen modal's close button?

This package wraps a modifier to autofocus an element in the DOM. It works for
inputs and for other elements.

As an alternative to installing this package, you might want to consider using
[this snippet](https://github.com/qonto/ember-autofocus-modifier/blob/v0.0.1/addon/modifiers/autofocus.js).


Usage
------------------------------------------------------------------------------

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


Installation
------------------------------------------------------------------------------

```
yarn add -D ember-autofocus-modifier
```
or 
```
npm install --save-dev ember-autofocus-modifier
```


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v2.13 or above
* Node.js v12 or above


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
