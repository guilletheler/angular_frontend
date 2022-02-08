import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {

  items: MenuItem[] = [];

  userName: string = '';

  constructor(private _router: Router,
    private authentication: AuthenticationService,
    private eventService: EventsService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        {
          label: 'Home', routerLink: '/home'
        },
        {
          label: 'Usuarios', routerLink: '/usuarios'
        },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];

    if(this.authentication.logged) {
      this.userName = this.authentication.userValue.nombre;
    } else {
      this.userName = '';
    }

    this.eventService.logEvent
      .subscribe(lov => {
        if(this.authentication.logged) {
          this.userName = this.authentication.userValue.nombre;
        } else {
          this.userName = '';
        }
      })


  }

  logout() {
    console.log('logout');
    this.authentication.logout();
  }

  routeToUsuarios() {
    this._router.navigate(['/usuarios']);
  }
}
