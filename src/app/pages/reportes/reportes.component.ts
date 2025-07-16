import { Component } from '@angular/core';
import { IConsultaReporte } from './interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from './reporte.service';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent {

  consulta: IConsultaReporte={
    fechaInicio: undefined,
    fechaFin: undefined
  }

  reportes: any[] = []

  constructor(
    private reporteService: ReporteService
  ){}


  obtenerReporte(){
    if(!this.consulta.fechaInicio && this.consulta.fechaFin){
      alert('Seleccione el rango de fechas')
      return
    }
    if(this.consulta.fechaInicio! > this.consulta.fechaFin!){
      alert('Seleccione el rango de fechas')
      return
    }
    this.reporteService.obtenerReportes(this.consulta).subscribe({
      next: (data)=>{
        this.reportes = data
      },
      error: (err) => alert('Error al cargar servicios'+ err)
    })
  }

}
