import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { AdminPlanComponent } from './pages/adminplan/adminplan.component';


export const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  {path: 'servicios', component: ServicioComponent },
  {path: 'adminplan', component: AdminPlanComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }, // opcional
];
