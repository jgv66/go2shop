import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent, ModalController, IonSegment, PopoverController, AlertController } from '@ionic/angular';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkService } from '../../services/network.service';
import { BaselocalService } from '../../services/baselocal.service';
import { VerprodPage } from '../verprod/verprod.page';
import { TrespuntosComponent } from '../../components/trespuntos/trespuntos.component';
import { Router } from '@angular/router';

const PAGE_SIZE = 20;
const IMG_URL   = 'http://www.grupocaltex.cl/imagenes/fotos18/';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  @ViewChild( IonContent, {static: true} ) content: IonContent;
  @ViewChild( IonSegment, {static: true} ) segment: IonSegment;

  imageList = [];
  offset    = 0;
  texto     = '';
  buscando  = false;
  lScrollInfinito = false;

  constructor(private modalCtrl: ModalController,
              public funciones: FuncionesService,
              private alertCtrl: AlertController,
              public baseLocal: BaselocalService,
              private netWork: NetworkService,
              private router: Router,
              private popoverCtrl: PopoverController ) {}

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

  scrollToTop() {
    this.content.scrollToTop(1500);
  }
  loadDefaultImg( event ) {
    event.target.src = 'assets/imgs/no-img.png';
  }

  vercarrito() {
    this.router.navigateByUrl( '/carrito' );
 }

  async verproducto( prod ) {
    const modal = await this.modalCtrl.create({
      component: VerprodPage,
      componentProps: { producto: prod }
    });
    return await modal.present();
  }

  buscar() {
    if ( this.texto !== '' ) {
      this.imageList = [];
      this.lScrollInfinito = true;
      this.loadImages( true );
    } else {
      this.funciones.msgAlert('', 'Debe ingresar algun dato para buscar en la tienda.' );
    }
  }

  loadImages(init, event?) {
    //
    if ( init === true ) {
      this.offset   = 0 ;
    } else {
      this.offset += PAGE_SIZE ;
    }
    this.buscando = true;
    //
    this.netWork.buscarProductos( this.texto, this.offset )
      .subscribe( (res: any) => {
        // console.log('respuesta ', res);
        res.data.forEach(element => {
          element.codigosincolor = IMG_URL + element.codigosincolor ;
        });
        this.buscando = false;
        if ( res.data.length > 0 ) {
          this.imageList = this.imageList.length === 0 ? res.data : [...this.imageList, ...res.data];
          if (event) {
            event.target.complete();
          }
          //
          if ( res.data < PAGE_SIZE ) {
            this.lScrollInfinito = false ;
          } else if ( init === true ) {
            this.lScrollInfinito = true ;
          }
        } else {
          this.buscando = false;
          this.lScrollInfinito = false ;
          if ( this.imageList.length === 0 ) {
            this.funciones.msgAlert('', 'No existen en la Tienda artículos con ese nombre o descripción o código. Corrija y reintente.' );
          }
        }
      });
    //
  }
  masDatos( infiniteScroll: any ) {
    this.loadImages( false, infiniteScroll );
  }

}
