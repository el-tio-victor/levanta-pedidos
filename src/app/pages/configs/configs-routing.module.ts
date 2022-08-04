import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioComponent} from "../inicio/inicio.component";
import {AuthGuardService} from "../layouts/auth/auth-guard.services";
import {ModulosComponent} from "./modulos/modulos.component";
import {PerfilComponent} from "./perfiles/perfil/perfil.component";
import {PerfilesComponent} from "./perfiles/perfiles.component";
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
        path: 'usuarios/:action/:id',
        component:UsuarioComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'usuarios/:action',
        component:UsuarioComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'modulos',
        component:ModulosComponent,
      
      },
      {
        path: 'roles',
        component: PerfilesComponent,
      
      },
      {
        path: 'roles/:id',
        component: PerfilComponent,
      } 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
