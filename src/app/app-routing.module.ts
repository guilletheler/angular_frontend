import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartasComponent } from './components/cartas/cartas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: '', component: HomeComponent,
  canActivate: [AuthGuard],
  data: { roles: [] }
},
{
  path: 'home', component: HomeComponent,
  canActivate: [AuthGuard],
  data: { roles: [] }
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: 'pedidos', component: PedidosComponent,
  canActivate: [AuthGuard],
  data: { roles: ['USER'] }
},
{
  path: 'cartas', component: CartasComponent,
  canActivate: [AuthGuard],
  data: { roles: ['USER'] }
},
{
  path: 'usuarios', component: UsuariosComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ADMIN'] }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
