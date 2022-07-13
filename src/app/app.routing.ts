import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackorderComponent} from './pages/backorder/backorder.component';
import {FacturasComponent} from "./pages/facturas/facturas.component";
import {HomeComponent} from './pages/home/home.component';
import {InicioComponent} from './pages/inicio/inicio.component';
import {AuthGuardService} from './pages/layouts/auth/auth-guard.services';
import {UserService} from './pages/layouts/auth/user.service';
import {LoginComponent} from './pages/login/login.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {PedidoComponent} from "./pages/pedido/pedido.component";
import {ShowByIdComponent} from "./pages/pedido/show-by-id/show-by-id.component";
import {PedidosComponent} from "./pages/pedidos/pedidos.component";



//SplashComponent
export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'admin/:usuario',
    component: InicioComponent,

    children: [
      {
        path: 'pedido',
        component: PedidoComponent,
        canActivate: [AuthGuardService]
      },
      
      {
        path: 'pedido/:id',
        component: ShowByIdComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'facturas',
        component: FacturasComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'backorder',
        component: BackorderComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'home',
        component: HomeComponent,
      }
    ], canActivate: [AuthGuardService]
  },

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }


];


@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [AuthGuardService, UserService],
  exports: [RouterModule,
  ]
})

export class AppRoutingModule { }
