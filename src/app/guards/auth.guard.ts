import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    const rolesRequeridos: string[] = route.data['roles'];

    var ret: boolean = false;

    // console.log('chequeando acceso a -' + route.url.toString() + '- requeridos: ' + rolesRequeridos);

    if (user && user.roles) {

      // check if route is restricted by role
      if (!rolesRequeridos || rolesRequeridos.length == 0) {
        // console.log('sin requerimiento de roles');
        ret = true;
      } else {

        for (var i = 0; i < user.roles.length; i++) {
          if (route.data['roles'].indexOf(user.roles[i]) >= 0) {
            ret = true;
            break;
          }
        }

        if (!ret) {
          // console.log('acceso insuficiente del usuario ' + user.nombre + ', redirigiendo a /');
          // role not authorised so redirect to home page
          this.router.navigate(['/']);
          this.messageService.add({ severity: 'error', summary: 'Error de permisos', detail: 'Permisos insuficientes para el usuario', life: 3000 });
          ret = false;
        }
      }
    } else {
      console.log('usuario no logueado, dirigiendo a / desde -' + route.url.toString() + '-');
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      ret = false;
    }

    // console.log('resultado: ' + ret);

    return ret;
  }
}
