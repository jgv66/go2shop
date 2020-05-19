import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  url = 'https://api.kinetik.cl/caltex-inf';

  constructor(private http: HttpClient ) {
    console.log('<<< NetworkService >>>');
  }

  menuOpts() {
    return this.http.get<any[]>( 'assets/data/menu/menu.json' );
  }

  vitrina( offset ) {
    const body = { offset };
    return this.http.post<any[]>(this.url + '/g2s_buscar', body );
  }

  buscarProductos( texto, offset ) {
    const body = { texto, offset };
    return this.http.post<any[]>(this.url + '/g2s_buscar', body );
  }

  buscarUsuario( user ) {
    const pssw = window.btoa(user.password);
    const body = { email: user.email, pssw };
    return this.http.post<any[]>(this.url + '/g2s_usuario', body );
  }

  crearUsuario( user ) {
    const pssw = window.btoa(user.password);
    const body = { email: user.email, pssw, celu: user.celular, nombre: user.nombre, direccion: user.direccion };
    return this.http.post<any[]>(this.url + '/g2s_insUsuario', body );
  }


}
