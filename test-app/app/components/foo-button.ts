import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FooButtonComponent extends Component {
  @tracked bar: boolean = false;

  @action
  updateBar(): void {
    this.bar = !this.bar;
  }
}
