import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  isAutenticado: boolean = false;

  constructor(
    private eventService: EventsService,
    private authenticationService: AuthenticationService) {

    // this.isAutenticado = authenticationService.logged;
  }

  ngOnInit() {

    this.isAutenticado = this.authenticationService.logged;
    this.eventService.logEvent
      .subscribe(logged => {
        this.isAutenticado = logged;
      });

  }
}
