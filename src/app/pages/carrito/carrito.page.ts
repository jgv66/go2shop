import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FuncionesService } from '../../services/funciones.service';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  grabando = false;

  constructor( private funciones: FuncionesService,
               private netWork: NetworkService,
               public baseLocal: BaselocalService,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}

  async whoiam() {
    const alert = await this.alertCtrl.create({
      // header: 'Alert',
      subHeader: this.baseLocal.user.email,
      message: this.baseLocal.user.celular,
      buttons: ['OK']
    });
    await alert.present();
  }

  agregar( item ) {
    const posicion = this.baseLocal.miCarrito.findIndex( it => it.codigo === item.codigo );
    this.baseLocal.miCarrito[posicion].cantidad += 1;
  }
  quitar( item ) {
    const posicion = this.baseLocal.miCarrito.findIndex( it => it.codigo === item.codigo );
    if ( this.baseLocal.miCarrito[posicion].cantidad === 1 ) {
      this.eliminar( item );
    } else {
      this.baseLocal.miCarrito[posicion].cantidad -= 1;
    }
  }

  async eliminar( item ) {
    const alert = await this.alertCtrl.create({
      message: 'Está seguro que desea eliminar este ítem de su carrito?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Sí, quítelo',
          handler: () => { this.baseLocal.quitarDelCarro( item ); }
        }
      ]
    });
    await alert.present();
  }

}
