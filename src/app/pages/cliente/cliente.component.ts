import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from './cliente.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  nuevoCliente: Cliente = {
    nombre: '',
    direccion: '',
    telefono: '',
    identificacion: '',
    correo: ''
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Error al obtener clientes', err)
    });
  }

crearCliente(): void {
  const { nombre, direccion, telefono, identificacion, correo } = this.nuevoCliente;

  // Armamos manualmente el payload
  const clientePayload = {
    nombre: nombre.trim(),
    direccion: direccion.trim(),
    telefono: telefono.trim(),
    identificacion: identificacion.trim(),
    correo: correo.trim()
  };

  this.clienteService.crearCliente(clientePayload).subscribe({
    next: (clienteCreado) => {
      this.clientes.push(clienteCreado);

      // Limpiar formulario
      this.nuevoCliente = {
        nombre: '',
        direccion: '',
        telefono: '',
        identificacion: '',
        correo: ''
      };
    },
    error: (err) => {
      console.error('Error al crear cliente:', err);
      alert('Error al crear cliente. Verifica que los datos no estén repetidos y el servidor esté funcionando.');
    }
  });
}


}
