import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte-uno',
  templateUrl: './reporte-uno.component.html',
  styleUrls: ['./reporte-uno.component.css'],
})
export class ReporteUnoComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();
  private labels: string[] = [''];

  constructor(private servicioReporte: ReporteService) {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  datos: ChartData<'bar'>;

  ngOnInit(): void {
    this.suscripcion.add(
      this.servicioReporte.obtenerSesionesPorUsuario().subscribe({
        next: (respuesta: Sesion[]) => {
          var ordenada: Sesion[] = respuesta.sort((n1, n2) =>{
            if(n1.cantidad>n2.cantidad){
              return -1;
            }
            if(n1.cantidad<n2.cantidad){
              return 1;
            }
            return 0;
          });
          const datosTransformados = ordenada.map((sesion) => {
            return {
              data: [sesion.cantidad],
              label: sesion.nombreUsuario,
              barThickness: 45, 
              borderRadius: 4,
              maxBarThickness:40 
            };
          });
          this.datos = {
            labels: this.labels,
            datasets: datosTransformados,            
          };
        },
        error: () => alert('API no responde'),
      })
    );
  }

  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {        
        position: 'bottom',
        display: true,
        labels:{          
          font:{
            family: 'sans-serif',
            size: 14          
          },          
        }                                    
      },
      title: {
        display: false,        
      }, 
      datalabels:{
        color: 'white',
      }                 
    },        
  scales:{      
    x: {                         
      grid: {         
        color : 'white',  
        drawBorder: false              
      },
      ticks: {color: 'white'},
      offset: true            
    },    
    y: {                   
      grid: {
        color : 'white',
        drawBorder: false                                 
      },      
      ticks: {color: 'white'},            
    },
  }, 
  color: 'white',   
  };
}
