import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ICrearUsuario, IUsuario } from "./interfaces";



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = `${environment.baseUrl}/UsuarioController`
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/UsuarioController`);
  }

  crearUsuario(usuario: ICrearUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.url, usuario);
  }
  // actualizarUsuario(cliente: Cliente): Observable<Cliente> {
  //   return this.http.patch<Cliente>(`${this.apiUrl}/${cliente.idCliente}`, cliente);
  // }
}
