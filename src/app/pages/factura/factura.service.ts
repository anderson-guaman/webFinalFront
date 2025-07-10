import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces para tipado de datos
export interface Cliente {
  idCliente: number;
  nombre: string;
  direccion: string;
  telefono: string;
  identificacion: string;
  correo: string;
}

export interface Plan {
  idPlan: number;
  nombrePlan: string;
  precioMensual: string;
  caracteristicas: string;
}

export interface Servicio {
  idServicio: number;
  nombre: string;
  estado: string;
  cliente?: Cliente;
  plan?: Plan;
}

export interface Factura {
  idFactura?: number;
  fechaEmision: string;
  monto: number | string;
  fechaPago?: string | null;
  servicioId: number;
  servicio?: Servicio;
}

export interface PagoPayload {
  fechaPago: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  //   private baseUrl = 'http://localhost:3000/FacturaController';
  private urlBase = environment.baseUrl;
  private baseUrl = `${this.urlBase}/FacturaController`;
  private servicioUrl = `${this.urlBase}/ServicioController`;
  //   private servicioUrl = 'http://localhost:3000/ServicioController';

  constructor(private http: HttpClient) { }


  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.baseUrl);
  }


  crearFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.baseUrl, factura);
  }


  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.servicioUrl);
  }


  pagarFactura(idFactura: number,factura:Factura): Observable<Factura> {
    return this.http.patch<Factura>(`${this.baseUrl}/${idFactura}`,factura);
  }
}
