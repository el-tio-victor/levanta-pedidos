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
            if(path.toLowerCase().includes(":action")){
              path = path.replace('/:action','');
            }
            return item.name.toLowerCase().includes(
              path.toLowerCase()
            )
          }
        )[0];

        /* Para despues validar si el path actual tiene permiso
        *  es una validación particular primero valido para ver las tablas
        *  de pedidos, facturas y backorder y ver detalle de cada item*/
        if(( path.slice(-1).toUpperCase() == "S" || path.includes(":id") )
          ||
          (path == 'backorder'  )){
          console.log(path);
          return current_module.actions.includes('LEER') 
        }
        /* Luego la validación para el modulo de pedidos en este caso en particular 
        * si se permite ingresar a la ruta de pedido para que el usuario pueda consultar el
        * stock la validación se aplica a la hora de habilitar o deshabilitar los inputs
        * si es que tiene o no permisos */
        else if(path == "pedido"){
          return current_module.actions.includes('LEER') ||
            current_module.actions.includes('CREAR');
        }
        else{
          return current_module.actions.includes('CREAR');
        }
      }
      
  }

}
