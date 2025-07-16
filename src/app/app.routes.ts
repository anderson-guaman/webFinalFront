import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { AdminPlanComponent } from './pages/adminplan/adminplan.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { RoleGuard } from './auth/guards/rol.guard';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { ReportesComponent } from './pages/reportes/reportes.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clientes',
    component: ClienteComponent,
    canActivate: [RoleGuard],
    data: { role: ['user', 'admin'] }
  },
  {
    path: 'servicios',
    component: ServicioComponent,
    canActivate: [RoleGuard],
    data: { role: ['admin'] }
  },
  {
    path: 'adminplan',
    component: AdminPlanComponent,
    canActivate: [RoleGuard],
    data: { role: ['admin'] }
  },
  {
    path: 'facturas',
    component: FacturaComponent,
    canActivate: [RoleGuard],
    data: { role: ['user', 'admin'] }
  },
  {
    path: 'usuarios',
    component: UserComponent,
    canActivate: [RoleGuard],
    data: { role: ['user', 'admin'] }
  },
    {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [RoleGuard],
    data: { role: ['user', 'admin'] }
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
];
