import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioComponent} from "../inicio/inicio.component";
import {AuthGuardService} from "../layouts/auth/auth-guard.services";
import {UsuarioComponent} from "./usuarios/usuario/usuario.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";


const routes: Routes = [
  {
    path: 'admin/:usuario',
    component: InicioComponent,
    children:[
      {
        path: 'usuarios',
        component:UsuariosComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'usuario/:id',
        component:UsuarioComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
