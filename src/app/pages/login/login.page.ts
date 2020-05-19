import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, MenuController } from '@ionic/angular';
import { BaselocalService } from '../../services/baselocal.service';
import { TrespuntosComponent } from '../../components/trespuntos/trespuntos.component';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class LoginPage implements OnInit {

  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef;

  access = {email: '', password: ''};
  regist = {email: '', celular: '', password: '', nombre: '', direccion: ''};
  forgot = {email: '', celular: ''};

  backType = 1;
  buscando = false;
  passwordType = 'password';

  constructor(private funciones: FuncionesService,
              private popoverCtrl: PopoverController,
              private menuCtrl: MenuController,
              public baseLocal: BaselocalService,
              private network: NetworkService) {}

  ngOnInit() {}

  togglePasswordMode() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

  login() {
    //
    // console.log( this.access );
    this.buscando = true;
    this.network.buscarUsuario( this.access )
      .subscribe( (res: any) => {
        // console.log('respuesta ', res);
        this.buscando = false;
        if ( res.resultado === 'ok' && res.data[0]?.id > 0 ) {
            this.baseLocal.guardaUltimoUsuario( res.data[0] );
            this.funciones.muestraySale( 'Hola ' + res.data[0].nombre + ', ' + this.funciones.textoSaludo() , 1.5 );
            this.menuCtrl.toggle();
        } else {
          this.funciones.msgAlert('', 'Email y clave no reconocidos. Corrija y reintente.');
        }
      }, () => { this.buscando = false;
                 this.funciones.msgAlert( '', 'Sin conexion con el servidor. Reintente luego.' );
      });
    //
  }

  register() {
    if ( this.regist.email === '' || this.regist.celular === '' ) {
      this.funciones.msgAlert('', 'Debe indicar su correo, nro.telefónico y una clave. Estos datos son obligatorios para hacer un registro básico.');
      return;
    }
    //
    this.buscando = true;
    this.network.crearUsuario( this.regist )
      .subscribe( (res: any) => {
        // console.log('respuesta ', res);
        this.buscando = false;
        if ( res.resultado === 'ok' && res.data[0]?.id > 0 ) {
          this.funciones.msgAlert('', 'Bienvenido a nuestra Tienda. Utilice su email y clave para entrar en la tienda.' );
          this.toggleRegister();
        } else {
          this.funciones.msgAlert('', res.data[0].mensaje );
        }
      }, () => { this.buscando = false;
                 this.funciones.msgAlert( '', 'Sin conexion con el servidor. Reintente luego.' );
      });
//
  }

  meolvide() {
    this.funciones.msgAlert( '', 'En contrucción' );
  }

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
