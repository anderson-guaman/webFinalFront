import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Cliente {
  idCliente?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  identificacion: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // private apiUrl = 'http://localhost:3000/ClientController';
  private urlBase = environment.baseUrl;
  private apiUrl = `${this.urlBase}/ClientController`


  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
}
