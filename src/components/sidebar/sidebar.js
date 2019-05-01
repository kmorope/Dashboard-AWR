import {
  faColumns,
  faCog,
  faInfoCircle,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'
import {
  HttpClient
} from 'aurelia-http-client';
import {
  bindable
} from 'aurelia-framework';


export class Sidebar {

  @bindable callback;

  constructor() {
    this.getRandomUser()
    this.user = []
    this.menuItems = [{
        title: 'Overview',
        icon: faColumns,
        selected: true,
        route: 'home'
      },
      {
        title: 'Agenda',
        icon: faCalendar,
        selected: false,
        route: 'agenda'
      },
      {
        title: 'Settings',
        icon: faCog,
        selected: false,
        route: 'settings'
      },
      {
        title: 'About',
        icon: faInfoCircle,
        selected: false,
        route: 'about'
      }
    ];
  }

  attached() {
    document.querySelectorAll('.menu-li').forEach(element => {
        let hash = window.location.hash;
        hash = hash.replace("#/",'');
        if(hash != element.getAttribute('data-route')){
            element.classList.remove('selected');
        }else{
            element.classList.add('selected');
        }
    });
  }

  getRandomUser() {
    let client = new HttpClient();
    client.get('https://randomuser.me/api/?nat=us')
      .then(data => {
        let result = JSON.parse(data.response)
        this.user = result.results[0]
      })
  }

  open(route,item) {
    document.querySelectorAll('.menu-li').forEach(element => {
        if(route != element.getAttribute('data-route')){
            element.classList.remove('selected');
        }else{
            element.classList.add('selected');
        }
    });
    item.selected = true;
    switch (route) {
      case "settings":
        this.openModal();
        break;
      default:
        this.openRoute(route);
        break;
    }
  }

  openModal() {
    this.callback({
      user: this.user
    });
  }

  openRoute(route) {
    window.location.href = '#/' + route;
  }
}