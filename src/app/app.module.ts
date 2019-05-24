import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormComponent} from './clientes/form.component';
import {FormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localeEsPy from '@angular/common/locales/es-PY';
import {PaginatorComponent} from './paginator/paginator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material';
import {LoginComponent} from './usuarios/login.component';
import {DetalleComponent} from './clientes/detalle/detalle.component';
import {AuthGuard} from './usuarios/guards/auth.guard';
import {RoleGuard} from './usuarios/guards/role.guard';
import {TokenInterceptor} from './usuarios/interceptors/token.interceptor';
import {AuthInterceptor} from './usuarios/interceptors/auth.interceptor';

registerLocaleData(localeEsPy);

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    LoginComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es_PY'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
