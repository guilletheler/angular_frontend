import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() inputSideNav: MatSidenav = Object();

  constructor(private _router: Router,
    private authentication: AuthenticationService,
    private eventService: EventsService) { }

  ngOnInit(): void {

  }

  openPedidos() {
    this.inputSideNav.toggle();
    this._router.navigate(['pedidos'])
  }

  openCartas() {
    this.inputSideNav.toggle();
    this._router.navigate(['cartas'])
  }

  openUsuarios() {
    this.inputSideNav.toggle();
    this._router.navigate(['usuarios'])
  }

  logout() {
    this.inputSideNav.toggle();
    this.authentication.logout();
  }


}
