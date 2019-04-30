import "relativity-web-components/dist/dependencies/native-shim-all-in-one.js";
import * as rwc from "relativity-web-components/dist/relativity-web-components.umd.js"
import {
  inject
} from 'aurelia-framework';

@inject(Element)
export class Settings {

  el;

  constructor(el) {
    this.el = el; 
    this.userData = {}
  }

  attached() {
    this.el.classList.add('hidden');
  }

  open(user) {
    this.el.classList.remove('hidden');
    this.userData = user;
    console.log(user)
  }

  close() {
    this.el.classList.add('hidden');
  }
};
