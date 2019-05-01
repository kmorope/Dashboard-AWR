import {
  inject,PLATFORM
} from 'aurelia-framework';
import {
  EventAggregator
} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class App {
  sidebarExtra = '';
  constructor(eventAggregator) {
    this.ea = eventAggregator;
  }
  attached() {
    this.sub = this.ea.subscribe('my-router', response => {
      if (typeof response.sidebarExtra !== 'undefined') {
        this.sidebarExtra = response.sidebarExtra;
      }
    });
  }
  detached() {
    this.sub.dispose();
  }
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Dashboard AWR';
    config.map([{
        route: ['', 'home'],
        name: 'overview',
        moduleId: PLATFORM.moduleName('views/overview/overview'), nav: true, title: 'Overview'
      },
      {
        route: 'agenda',
        name: 'agenda',
        moduleId: PLATFORM.moduleName('views/agenda/agenda'), nav: true, title: 'Agenda'
      }
    ]);
  }
}