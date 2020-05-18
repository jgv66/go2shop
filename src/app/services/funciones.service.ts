import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  pendientes: number;
  recibidos: number;
  misMensajes: number;

  constructor(  public toastCtrl: ToastController,
                public alertCtrl: AlertController ) {
    console.log('<<< FuncionesProvider >>>');
  }

  async msgAlert( titulo, texto ) {
    const alert = await this.alertCtrl.create({
      // header: titulo,
      mode: 'md',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }

  async muestraySale( cTexto, segundos, posicion?, color? ) {
    const toast = await this.toastCtrl.create({
      message: cTexto,
      duration: 1500 * segundos,
      position: posicion || 'middle',
      color: ( color ) ? color : 'danger',
      buttons: [
         {
          text: 'Ok',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    toast.present();
  }

  textoSaludo() {
    const dia   = new Date();
    if ( dia.getHours() >= 8  && dia.getHours() < 12 ) {
      return 'buenos días ';
    } else if ( dia.getHours() >= 12 && dia.getHours() < 19 ) {
      return 'buenas tardes ';
    } else {
      return 'buenas noches '; }
  }

  hideTabs() {
    let estilo = '';
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    const elem   = <HTMLElement> document.querySelector('.tabbar');
    if (elem != null) {
      estilo             = elem.style.display;  // se guarda
      elem.style.display = 'none';              // se anula
    }
    return estilo;
  }

  showTabs( estilo ) {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    const elem = <HTMLElement> document.querySelector('.tabbar');
    if (elem != null) {
      elem.style.display = estilo;
    }
  }

}
