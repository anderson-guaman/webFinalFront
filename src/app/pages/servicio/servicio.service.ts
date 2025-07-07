import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ServicioController`);
  }

  createServicio(servicio: ServicioPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/ServicioController`, servicio);
  }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ClientController`);
  }

  getPlanes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/PlanController`);
  }
}
