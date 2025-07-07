import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FacturaService, Factura, Servicio } from './factura.service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CurrencyPipe, DatePipe],
  templateUrl: './factura.component.html',
})
export class FacturaComponent implements OnInit {
  facturasPendientes: Factura[] = [];
  facturasPagadas: Factura[] = [];
  serviciosDisponibles: Servicio[] = [];

  nuevaFactura: any = {
    fechaEmision: '',
    monto: null,
    servicioId: null,
    fechaPago: null
  };

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarServicios();
  }

  cargarFacturas(): void {
    this.facturaService.getFacturas().subscribe({
      next: (data) => {
        this.facturasPendientes = data.filter(factura => !factura.fechaPago);
        this.facturasPagadas = data.filter(factura => !!factura.fechaPago);
      },
      error: (err) => console.error('Error al cargar facturas', err)
    });
  }

  cargarServicios(): void {
    this.facturaService.getServicios().subscribe({
      next: (data) => this.serviciosDisponibles = data,
      error: (err) => console.error('Error al cargar servicios', err)
    });
  }

  crearFactura(): void {
    if (!this.nuevaFactura.fechaEmision || !this.nuevaFactura.monto || !this.nuevaFactura.servicioId) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    this.facturaService.crearFactura(this.nuevaFactura).subscribe({
      next: (nueva) => {
        this.facturasPendientes.push(nueva);
        this.nuevaFactura = { fechaEmision: '', monto: null, servicioId: null, fechaPago: null };
      },
      error: (err) => {
        console.error('Error al crear factura', err);
        alert('Hubo un error al crear la factura. Revisa la consola para más detalles.');
      }
    });
  }

  /**
   * --- FUNCIÓN MODIFICADA PARA SOLUCIÓN VISUAL ---
   * Esta función ya NO llama al backend. Solo manipula los datos en el frontend.
   * El cambio es temporal y se perderá al recargar la página.
   * @param facturaAPagar La factura seleccionada de la lista de pendientes.
   */
  marcarComoPagada(facturaAPagar: Factura): void {
    if (!facturaAPagar.idFactura) {
      console.error('La factura no tiene un ID para ser procesada.');
      return;
    }

    // 1. Eliminamos la factura de la lista de pendientes
    this.facturasPendientes = this.facturasPendientes.filter(f => f.idFactura !== facturaAPagar.idFactura);

    // 2. Creamos una copia de la factura y le asignamos la fecha de pago de hoy
    const facturaPagada: Factura = {
      ...facturaAPagar,
      fechaPago: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
    };

    // 3. Añadimos la factura actualizada a la lista de pagadas
    this.facturasPagadas.push(facturaPagada);
  }
}
