import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {SharedsModule} from "./../shareds/shareds.module";
import {ConfigsRoutingModule} from './configs-routing.module';
import {ModulosComponent} from './modulos/modulos.component';
import {PerfilComponent} from './perfiles/perfil/perfil.component';
import {PerfilesComponent} from './perfiles/perfiles.component';
import {EditCreateComponent} from './usuarios/usuario/edit-create/edit-create.component';
import {UsuarioComponent} from './usuarios/usuario/usuario.component';
import {ViewComponent} from './usuarios/usuario/view/view.component';
import {UsuariosComponent} from './usuarios/usuarios.component';



@NgModule({
  entryComponents:[
  ],
  declarations: [UsuariosComponent,
    UsuarioComponent,
    ViewComponent,
    EditCreateComponent,
    ModulosComponent,
    PerfilesComponent,
    PerfilComponent,
  ],
  imports: [
    MatSelectModule,
    CommonModule,
    ConfigsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedsModule,
    MatInputModule,
    MatFormFieldModule,
    DragDropModule,
  ]
})
export class ConfigsModule { }
