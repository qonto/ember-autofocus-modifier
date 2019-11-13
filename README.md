ember-autofocus-modifier
==============================================================================

This is a simple modifier to handle the autofocus of your inputs and other elements.


Usage
------------------------------------------------------------------------------

<div>By default, it will search for the first non-disabled input in the dom node that it has been attached to.</div>
<div>You can specify a custom selector to target other element as the first positional parameter.</div> 
<div>If no child is found, then it will try to focus the element itself.</div>

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
ember install ember-autofocus-modifier
```


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
