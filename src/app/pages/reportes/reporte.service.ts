import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IConsultaReporte } from "./interfaces";



@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  // private baseUrl = 'http://localhost:3000';
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}


  obtenerReportes(consulta: IConsultaReporte): Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}/ServicioController/ObtenerReporte`, consulta);
  }
}
