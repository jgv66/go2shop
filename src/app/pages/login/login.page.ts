import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BaselocalService } from '../../services/baselocal.service';
import { TrespuntosComponent } from '../../components/trespuntos/trespuntos.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef;

  email: '';
  celular: '';
  password: '';
  nombre: '';
  direccion = '';
  backType = 1;

  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private router: Router,
              private popoverCtrl: PopoverController,
              public baseLocal: BaselocalService ) {}

  ngOnInit() {}

  login() {}

  register() {}

  meolvide() {}

  toggleRegister( back? ) {
    if ( back ) {
      this.backType = back;
    }
    this.flipcontainer.nativeElement.classList.toggle('flip');
  }

  async vercarrito() {
    //
    const popover = await this.popoverCtrl.create({
      component: TrespuntosComponent,
      event,
      mode: 'ios',
      translucent: false
    });
    await popover.present();
    //
    const { data } = await popover.onWillDismiss();
    if ( data ) {
      // se debe mostrar el baseLocal.miCarrito
      // this.verproducto( this.imageList[data.pos] );
    }
  }

}
