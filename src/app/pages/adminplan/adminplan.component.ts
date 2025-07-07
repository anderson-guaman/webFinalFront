import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminPlanService } from './adminplan.service';

@Component({
  selector: 'app-adminplan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminplan.component.html',
})
export class AdminPlanComponent implements OnInit {
  planes: any[] = [];

  nuevoPlan = {
    nombrePlan: '',
    precioMensual: 0, 
    caracteristicas: ''
  };

  constructor(private adminPlanService: AdminPlanService) {}

  ngOnInit(): void {
    this.cargarPlanes();
  }

  cargarPlanes(): void {
    this.adminPlanService.getPlanes().subscribe({
      next: (data) => {
        this.planes = data;
      },
      error: (err) => {
        console.error('Error al cargar planes:', err);
      }
    });
  }

  agregarPlan(): void {
    if (
      !this.nuevoPlan.nombrePlan ||
      this.nuevoPlan.precioMensual <= 0 ||
      !this.nuevoPlan.caracteristicas
    ) return;

    this.adminPlanService.createPlan(this.nuevoPlan).subscribe({
      next: (plan) => {
        this.planes.push(plan);
        this.nuevoPlan = {
          nombrePlan: '',
          precioMensual: 0,
          caracteristicas: ''
        };
      },
      error: (err) => {
        console.error('Error al crear plan:', err);
      }
    });
  }
}
