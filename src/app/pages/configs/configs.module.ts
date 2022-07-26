import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedsModule} from "./../shareds/shareds.module";
import {ConfigsRoutingModule} from './configs-routing.module';
import {UsuarioComponent} from './usuarios/usuario/usuario.component';
import {UsuariosComponent} from './usuarios/usuarios.component';


@NgModule({
  entryComponents:[
  ],
  declarations: [UsuariosComponent,
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    SharedsModule,
  ]
})
export class ConfigsModule { }
