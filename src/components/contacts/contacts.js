import {
  bindable,
  bindingMode
} from 'aurelia-framework';

export class Contacts {

  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) contacts;

  constructor() {

  }
}