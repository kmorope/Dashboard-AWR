import {
  inject
} from 'aurelia-framework';
import {
  EventAggregator
} from 'aurelia-event-aggregator';

@inject(EventAggregator)

export class Overview {
  constructor(eventAggregator) {
    this.ea = eventAggregator;
  }
  activate() {
    this.ea.publish('my-router', {
      sidebarExtra: "overview.html"
    })
  }
}