import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { BaselocalService } from '../../services/baselocal.service';
import { NetworkService } from '../../services/network.service';
import { AlertController } from '@ionic/angular';

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

  async eliminar( producto ) {
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
          handler: () => { this.baseLocal.quitarDelCarro( producto ); }
        }
      ]
    });
    await alert.present();
  }

}
