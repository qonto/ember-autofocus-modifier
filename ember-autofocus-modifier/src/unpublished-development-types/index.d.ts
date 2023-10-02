import "@glint/environment-ember-loose";
import "ember-source/types";
import "ember-source/types/preview";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
