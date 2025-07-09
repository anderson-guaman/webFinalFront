import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Plan {
  id?: number;
  nombrePlan: string;
  precioMensual: number;
  caracteristicas: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPlanService {
  // private baseUrl = 'http://localhost:3000';
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.baseUrl}/PlanController`);
  }

  createPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.baseUrl}/PlanController`, plan);
  }
}
