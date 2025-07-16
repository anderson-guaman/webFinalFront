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

  constructor(private facturaService: FacturaService) { }

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
    // if (!this.nuevaFactura.fechaEmision || !this.nuevaFactura.monto || !this.nuevaFactura.servicioId) {
    //   alert('Por favor, completa todos los campos del formulario.');
    //   return;
    // }
    console.log(typeof this.nuevaFactura.servicioId)
    const factura:Factura = {
      monto: +this.serviciosDisponibles.filter(s=>s.idServicio === +this.nuevaFactura.servicioId)[0].plan?.precioMensual!,
      servicioId: +this.nuevaFactura.servicioId,

    }

    this.facturaService.crearFactura(factura).subscribe({
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


  marcarComoPagada(facturaAPagar: Factura): void {
    if (!facturaAPagar.idFactura) {
      console.error('La factura no tiene un ID para ser procesada.');
      return;
    }

    this.facturaService.pagarFactura(facturaAPagar.idFactura, facturaAPagar)
      .subscribe({
        next: (fac) => {
          alert('pago con exito factura: ' + fac.idFactura)
          this.cargarFacturas();
        },
        error: error => {
          alert(error)
          this.cargarFacturas();
        }
      })

  }
}
