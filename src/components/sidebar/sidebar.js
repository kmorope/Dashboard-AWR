import { faColumns,faCog,faInfoCircle,faCalendar } from '@fortawesome/free-solid-svg-icons'
import {HttpClient} from 'aurelia-http-client';
import { bindable } from 'aurelia-framework';

export class Sidebar{

    @bindable callback;

    constructor() {
        this.getRandomUser()
        this.user = []
        this.menuItems = [
            {
                title: 'Overview',
                icon: faColumns,
                selected : true
            },
            {
                title: 'Agenda',
                icon: faCalendar,
                selected : false
            },
            {
                title: 'Settings',
                icon: faCog,
                selected : false
            },
            {
                title: 'About',
                icon: faInfoCircle,
                selected : false
            }
        ]
    }

    getRandomUser(){
        let client = new HttpClient();
        client.get('https://randomuser.me/api/?nat=us')
            .then(data => {
                let result = JSON.parse(data.response)
                this.user = result.results[0]
            })
    }

    openModal(){
        this.callback({user: this.user});
    }
}