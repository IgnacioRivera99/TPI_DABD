import { HttpClient } from '@angular/common/http';
import { Injectable, SimpleChange } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ReporteCuatro } from '../models/reporte-cuatro';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private estadoSubject : Subject<number>;  
  private usuarioID : BehaviorSubject<number>;
  private token:string;

  private isLoggedIn: Subject<boolean>;
  private usuarioLogueado: Subject<Usuario>;
  public loggedIn: boolean;


  private URLAPI: string = 'https://localhost:7274/api/';

  constructor(private http: HttpClient) {
    this.isLoggedIn = new Subject<boolean>();
    this.usuarioLogueado = new Subject<Usuario>();
    this.isLoggedIn.next(false);
    this.loggedIn=false;
    this.estadoSubject = new Subject<number>();  
    this.usuarioID = new BehaviorSubject<number>(-1);   
  }

  obtenerUsuarioID(): Observable<number>{
    return this.usuarioID.asObservable();
  }

  darUsuarioID(id: number){
    this.usuarioID.next(id);
  }

  cambiarEstado(valor: number){
    this.estadoSubject.next(valor);
  } 

  estadoCambio():Observable<number>{
    return this.estadoSubject.asObservable();
  }

  obtenerUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.URLAPI + 'Usuario/login', usuario);
  }

  loguear(usuario: Usuario) {
    this.usuarioLogueado.next(usuario);
    this.isLoggedIn.next(true);
    this.loggedIn=true;
  }

  desloguear() {
    this.token='';
    this.isLoggedIn.next(false);
  }

  estadoLogueo(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  
  usuarioLogin(): Observable<Usuario> {
    return this.usuarioLogueado.asObservable();
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.URLAPI + 'Usuario', usuario);
  }
  getJWTToken(){
    return this.token;
  }
  setJWTToken(token:string){
    this.token=token;
  }

  aumentarPerdidaJugador(idUsuario: number): Observable<number>{
    return this.http.put<number>(this.URLAPI + 'Usuario/PutGanadasCroupier'+idUsuario, idUsuario);
  }

  aumentarBlackJackJugador(idUsuario: number): Observable<any>{
    return this.http.put<number>(this.URLAPI + "Usuario/PutJugadorBlackjack"+idUsuario, idUsuario);
  }  
}
