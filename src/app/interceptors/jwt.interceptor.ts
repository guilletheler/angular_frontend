import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authenticationService.userValue;
        const isApiUrl = request.url.startsWith(environment.apiUrl);

    // console.log('interceptando request para ' + request.url);

    if (isApiUrl) {
      // console.log('llamada a api');
      if (this.authenticationService.logged) {
        // console.log('Usuario ' + user.username + ' logueado, agregando token: ' + user.token);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
      } else {
        console.log('Usuario no logueado, no se agrega token');
      }
    }

    return next.handle(request);
  }
}
