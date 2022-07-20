import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  isValid( path:string ): boolean {

      let a = JSON.parse(localStorage.getItem("nesdata"));
      let rol = a.rol;
      let modules = a.modules;

      //el primer caso es para la ruta inicial de admin
      if(  path.includes('admin')){
        return true;
      }
      else {
        //cuando renderiza el resto de rutas 

        let output = false;
        
        /* Primero recorro todos los modulos para extraer las
        * coincidencias con el path actual*/
        let current_module = modules.filter(
          item => {
            //para el caso de ver detalle 
            if(path.toLowerCase().includes(":id")){
              path = path.replace('/:id','');
            }
            return item.name.toLowerCase().includes(
              path.toLowerCase()
            )
          }
        )[0];

        /* Para despues validar si el path actual tiene permiso*/
        if(( path.slice(-1).toUpperCase() == "S" || path.includes(":id") )
          ||
          path == 'backorder'){
          return current_module.actions.includes('LEER');
        }
        else{
          return current_module.actions.includes('CREAR');
        }
      }
      
  }

}
