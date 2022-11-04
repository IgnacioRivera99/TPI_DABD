import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteDos } from '../models/reporte-dos';
import { ReporteTres } from '../models/reporte-tres';
import { Sesion } from '../models/sesion';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerSesionesPorUsuario(): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(this.URLAPI + "Sesiones/CantSesiones");
  } 

  obtenerJugadasGanadas(idUsuario:number): Observable<ReporteDos> {
    return this.http.get<ReporteDos>(this.URLAPI + "Usuario/GanadasJugador?id="+idUsuario);
  } 
  obtenerBlackjackNatural(idUsuario:number): Observable<ReporteTres> {
    return this.http.get<ReporteTres>(this.URLAPI + "Usuario/GanadasBlackjack?id="+idUsuario);
  } 
}
