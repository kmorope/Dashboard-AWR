import {
  inject
} from 'aurelia-framework';
import {
  HttpClient
} from 'aurelia-http-client';

export class Agenda {
  constructor() {
    this.fakeLoad = 0;
    this.loadInterval = {};
  }
  attached() {
    this.loadInterval = setInterval(() => {
      this.fakeLoad++;
      this.checkLoad();
    }, 200);
    this.getContactList();
  }

  checkLoad() {
    if (this.fakeLoad >= 102) {
      document.querySelectorAll('.fake').forEach(element => {
        element.classList.add('hidden');
      })
      clearInterval(this.loadInterval)
    }
  }

  getContactList() {
    let client = new HttpClient();
    client.get('https://randomuser.me/api/?nat=us&results=10')
      .then(data => {
        let result = JSON.parse(data.response)
        this.contactList = result.results;
      })
  }
}