import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

  acciones: Observable<any[]>;

  constructor( private http: HttpClient ) {}

  ngOnInit() {
    this.acciones = this.http.get<any[]>( 'assets/data/menu/menu.json' );
  }

}
