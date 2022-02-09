import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { EventsService } from './events.service';
import { lastValueFrom } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private eventService: EventsService
  ) {

  }

  public get userValue(): User {
    let tmp = JSON.parse(localStorage.getItem('user') || '{}');

    // console.log('userValue: ' + JSON.stringify(tmp));

    return tmp;
  }

  public get logged(): boolean {
    if (this.userValue && this.userValue.token) {
      // console.log('El usuario no es nulo ' + this.userValue.nombre + ' y tiene token ' + this.userValue.token + ', autenticado = true');
      return true;
    }
    return false;
  }

  async login(username: string, password: string): Promise<boolean> {

    // console.log('intentando login para ' + username + ' al servidor ' + `${environment.apiUrl}/users/authenticate`);

    var subject = new Subject<boolean>();

    var usuario = await lastValueFrom(this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password }));

    if (usuario) {
      localStorage.setItem('user', JSON.stringify(usuario));
      console.log('login completado para ' + usuario.username + ' con token ' + usuario.token);
      this.eventService.fireLogEvent(true);
      this.router.navigate(['home']);

      return true;
    } else {
      return false;
    }

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.eventService.fireLogEvent(false);
    this.router.navigate(['']);
  }
}
