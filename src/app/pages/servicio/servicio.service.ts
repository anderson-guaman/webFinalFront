import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ServicioPayload {
  nombre: string;
  estado: string;
  clienteId: number | null;
  planId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  // private baseUrl = 'http://localhost:3000';
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ServicioController`);
  }

  createServicio(servicio: ServicioPayload): Observable<any> {

    const nuevoServicio = {
      ...servicio,
      clienteId: +servicio.clienteId!,
      planId: +servicio.planId!
    }
    return this.http.post(`${this.baseUrl}/ServicioController`, nuevoServicio);
  }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ClientController`);
  }

  getPlanes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/PlanController`);
  }
}
