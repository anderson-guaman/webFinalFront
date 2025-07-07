import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService, ServicioPayload } from './servicio.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './servicio.component.html',
})
export class ServicioComponent implements OnInit {
  servicios: any[] = [];
  clientes: any[] = [];
  planes: any[] = [];

  nuevoServicio: ServicioPayload = {
    nombre: '',
    estado: 'activo',
    clienteId: null,
    planId: null
  };

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.servicioService.getServicios().subscribe({
      next: (data) => this.servicios = data,
      error: (err) => console.error('Error al cargar servicios', err)
    });

    this.servicioService.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error al cargar clientes', err)
    });

    this.servicioService.getPlanes().subscribe({
      next: (data) => this.planes = data,
      error: (err) => console.error('Error al cargar planes', err)
    });
  }

  crearServicio(): void {
    if (
      !this.nuevoServicio.nombre ||
      !this.nuevoServicio.estado ||
      this.nuevoServicio.clienteId === null ||
      this.nuevoServicio.planId === null
    ) {
      console.warn('Por favor completa todos los campos.');
      return;
    }

    this.servicioService.createServicio(this.nuevoServicio).subscribe({
      next: (servicio) => {
        this.servicios.push(servicio);
        this.nuevoServicio = {
          nombre: '',
          estado: 'activo',
          clienteId: null,
          planId: null
        };
      },
      error: (err) => console.error('Error al crear servicio', err)
    });
  }
}
