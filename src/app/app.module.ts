import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {TagInputModule} from "ngx-chips";
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
//MODULOS 
import {GlobalService} from './global.service';
//INTERCEPTORS
import {HeaderInterceptor} from "./header.interceptor";
import {BackorderComponent} from './pages/backorder/backorder.component';
import {FacturasComponent} from './pages/facturas/facturas.component';
import {InicioComponent} from './pages/inicio/inicio.component';
import {AdminLayoutComponent} from './pages/layouts/admin/admin-layout.component';
import {AuthGuardService} from './pages/layouts/auth/auth-guard.services';
import {AuthLayoutComponent} from './pages/layouts/auth/auth-layout.component';
import {UserService} from './pages/layouts/auth/user.service';
import {LoaderComponent} from './pages/loader/loader.component';
import {LoginComponent} from './pages/login/login.component';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {DetailPedidoComponent} from './pages/pedido/detail-pedido/detail-pedido.component';
import {ConfirmOrderComponent} from './pages/pedido/detail-pedido/panels/confirm-order/confirm-order.component';
import {ExtraInfoComponent} from './pages/pedido/detail-pedido/panels/extra-info/extra-info.component';
import {UpdatePedidoComponent} from './pages/pedido/detail-pedido/panels/update-pedido/update-pedido.component';
import {HeaderVisorPedidosComponent} from './pages/pedido/header-visor-pedidos/header-visor-pedidos.component';
import {ItemVisorPedidosComponent} from './pages/pedido/item-visor-pedidos/item-visor-pedidos.component';
import {PedidoComponent} from './pages/pedido/pedido.component';
import {ShowByIdComponent} from './pages/pedido/show-by-id/show-by-id.component';
import {PedidosComponent} from './pages/pedidos/pedidos.component';
import {FiltersTableComponent} from './pages/shared/components/filters-table/filters-table.component';
import {MenuViewsComponent} from './pages/shared/components/menu-views/menu-views.component';
import {FooterModule} from './pages/shared/footer/footer.module';
import {NavbarModule} from './pages/shared/navbar/navbar.module';
import {SendEmailComponent} from './pages/shared/send-email/send-email.component';
import {SidebarModule} from './pages/sidebar/sidebar.module';
import {FormaturlPipe} from './pipes/formaturl.pipe';
import { HomeComponent } from './pages/home/home.component';







@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CommonModule,

  ],
  declarations: [HomeComponent],
  imports: [NoopAnimationsModule,FormsModule]
})
export class MaterialModule { }

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    HttpClientModule,
    MaterialModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    ToastrModule.forRoot(),
    DragDropModule,
    TagInputModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    LoaderComponent,
    InicioComponent,
    FormaturlPipe,
    PageNotFoundComponent,
    PedidoComponent,
    HeaderVisorPedidosComponent, ItemVisorPedidosComponent,
    DetailPedidoComponent,
    UpdatePedidoComponent,
    ExtraInfoComponent, 
    ConfirmOrderComponent, 
    PedidosComponent,
    ShowByIdComponent,
    SendEmailComponent,
    FacturasComponent,
    BackorderComponent,
    FiltersTableComponent,
    MenuViewsComponent,
  ],

  providers: [
    MatNativeDateModule,
    GlobalService,
    AuthGuardService,
    UserService,
    FormaturlPipe,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true  },

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
