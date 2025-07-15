import { Component, OnInit } from '@angular/core';
import { ICrearUsuario, IUsuario } from './interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule,],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  usuarios!: IUsuario[];
  nuevoUsuario: ICrearUsuario = {
    password: '',
    userName: '',
    role: ''
  }

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar servicios', err)
    })
  }


  paraActualizar(usuario: IUsuario) {
    alert('entror')
    this.nuevoUsuario = {
      userName: usuario.userName,
      password: '',
      role: usuario.role
    }
  }

  crearUsuario(): void {
    const user: ICrearUsuario = {
      password: this.nuevoUsuario.password,
      userName: this.nuevoUsuario.userName,
      role: this.nuevoUsuario.role
    };

    this.usuarioService.crearUsuario(user).subscribe({
      next: (clienteCreado) => {
        this.limpiarFormulario();
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      }
    });
    this.obtenerUsuarios();
  }

  limpiarFormulario() {
    this.nuevoUsuario = {
      userName:'',
      password:'',
      role:''
    };
  }

}
