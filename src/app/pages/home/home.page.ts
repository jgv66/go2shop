import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent, ModalController, IonSegment, PopoverController } from '@ionic/angular';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkService } from '../../services/network.service';
import { BaselocalService } from '../../services/baselocal.service';
import { VerprodPage } from '../verprod/verprod.page';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { TrespuntosComponent } from '../../components/trespuntos/trespuntos.component';

const PAGE_SIZE = 20;
const IMG_URL   = 'http://www.grupocaltex.cl/imagenes/fotos18/';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class HomePage implements OnInit {

  @ViewChild( IonContent, {static: true} ) content: IonContent;
  @ViewChild( IonSegment, {static: true} ) segment: IonSegment;

  misArticulos: Observable<number>;

  imageList = [];
  offset    = 0;
  config;
  buscando  = false;
  segmento = '';
  lScrollInfinito = false;

  constructor(public modalCtrl: ModalController,
              private popoverCtrl: PopoverController,
              private funciones: FuncionesService,
              public baseLocal: BaselocalService,
              private netWork: NetworkService,
              public domSanitizer: DomSanitizer ) {
    this.loadImages(0);
  }

  ngOnInit() {
    // console.log('ngOnInit');
    this.segment.value = 'todos';
    this.misArticulos = this.baseLocal.CartZise;
    this.baseLocal.obtenUltimoConfig().then( data => this.config = data );
    this.baseLocal.inicializa();
    this.loadImages( true );
  }

  async vercarrito() {
    console.log(this.baseLocal.miCarrito);
    //
    const popover = await this.popoverCtrl.create({
      component: TrespuntosComponent,
      event,
      mode: 'ios',
      translucent: false
    });
    await popover.present();
    //
  }

  segmentChanged(event) {
    const valorSegmento = event.detail.value;
    if ( valorSegmento === 'todos' ) {
      this.segmento = '';
      return;
    }
    this.segmento = valorSegmento;
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }
  loadDefaultImg( event ) {
    event.target.src = 'assets/imgs/no-img.png';
  }

  async verproducto( prod ) {
    const modal = await this.modalCtrl.create({
      component: VerprodPage,
      componentProps: { producto: prod }
    });
    return await modal.present();
  }

  loadImages(init, event?) {
    //
    if ( init === true ) {
      this.buscando = true;
      this.offset   = 0 ;
      this.lScrollInfinito = true;
    } else {
      this.offset += PAGE_SIZE ;
    }
    //
    this.netWork.vitrina( this.offset )
      .subscribe( (res: any) => {
        console.log('respuesta ', res);
        res.data.forEach(element => {
          element.codigosincolor = IMG_URL + element.codigosincolor ;
        });
        this.buscando = false;
        this.imageList = this.imageList.length === 0 ? res.data : [...this.imageList, ...res.data];
        if (event) {
          event.target.complete();
        }
        if ( res.data < PAGE_SIZE ) {
          this.lScrollInfinito = false ;
        } else if ( init === true ) {
          this.lScrollInfinito = true ;
        }
      });
    //
  }

}

/*

CREATE TABLE [dbo].[ktb_home](
	[codigo] [char](13) NOT NULL,
	[descripcion] [varchar](100) NULL,
	[orden] [int] NULL,
	[segmento] [varchar](20) NULL,
 CONSTRAINT [PK_ktb_home] PRIMARY KEY CLUSTERED
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '17I11208H1190','',00)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '17I145706290' ,'',01)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '17I159023CA'  ,'',02)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '17V16005-90'  ,'',03)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '21V1810715A00','',04)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '19I1815Z1490A','',05)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '20I182535AA0' ,'',06)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '19V18MZPA12T0','',07)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '21V190221390' ,'',08)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '17I118740'    ,'',09)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '19VAT10903CA' ,'',10)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '20VAT265240'  ,'',11)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '20I15466140'  ,'',12)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '20V171438490' ,'',13)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '20I1819981KA' ,'',14)
INSERT INTO ktb_home ( codigo,descripcion,orden) VALUES ( '20I192338340' ,'',15)


-- exec ksp_go2shop_buscarprod null,0
-- exec ksp_go2shop_buscarprod 'ngx',0 ;
IF OBJECT_ID('ksp_go2shop_buscarprod', 'P') IS NOT NULL  
    DROP PROCEDURE ksp_go2shop_buscarprod;  
GO  
CREATE PROCEDURE ksp_go2shop_buscarprod ( @texto varchar(50), @offset int ) 
--With Encryption
AS
BEGIN
 
    SET NOCOUNT ON
	--
	declare @query			NVARCHAR(max)	= ''; 
    declare @stock			varchar(200)	= '';  -- AND COALESCE(BO.STFI1,0) <> 0
	declare @soloconprecios varchar(200)	= ' AND coalesce(L.precio, 0) > 0 ';  -- AND coalesce(L.precio, 0) > 0 
	declare @paginar		varchar(200)	= ' OFFSET '+rtrim(cast(@offset as varchar(5)))+' ROWS FETCH NEXT 20 ROWS ONLY; ';
	declare @xorden			varchar(200)	= '';
	declare @descri			varchar(2500);
	declare @xnokopr		varchar(500);
	declare @xkopr			varchar(500);
	declare @xnokopramp		varchar(500);
	--
	set @query += 'with precios as ( select L.KOPR,TL.MELT,(case when TL.MELT=''N'' then ''Neto'' else ''Bruto'' end) as tipolista, L.PP01UD as precio ';
	set @query +=					'from TABPRE  AS L with (nolock) ';
	set @query +=					'inner join TABPP TL  with (nolock) on L.KOLT=TL.KOLT ';
	set @query +=					'where L.KOLT=''01P'' ) ';
    set @query += 'select PR.KOPR as codigo,';
	set @query +=         '(case when patindex(''%-%'',reverse(rtrim(PR.KOPRTE)))>0 then substring(rtrim(PR.KOPRTE), 1, len(rtrim(PR.KOPRTE))-patindex(''%-%'',reverse(rtrim(PR.KOPRTE)))) else rtrim(PR.KOPRTE) end) as codigosincolor,';
    set @query +=         'rtrim(PR.NOKOPR) AS descripcion,PR.UD01PR as unidad1, PR.RLUD as rtu,';
    set @query +=         'COALESCE(BO.STFI1,0) as fisico_ud1,';
    set @query +=         'rtrim(MAR.NOKOMR) as marca, L.precio,';
    set @query +=         'L.tipolista,L.MELT as metodolista,''01P'' as listaprecio ';
	--
	if ( @texto is null ) set @query += ',home.segmento ';
	else				  set @query += ','''' as segmento ';
	--
    set @query += 'FROM MAEPR         AS PR  WITH (NOLOCK) ';
    set @query += 'inner join MAEPREM AS ME  WITH (NOLOCK) on PR.KOPR=ME.KOPR and ME.EMPRESA=''02'' ';
	--
	if ( @texto is null ) begin
		set @query += 'inner join ktb_home AS home  WITH (NOLOCK) on PR.KOPR=home.codigo ';
	end;
	--
    set @query += 'left  join MAEST   AS BO  WITH (NOLOCK) on BO.EMPRESA=''02'' and BO.KOSU=''CMA'' AND BO.KOBO=''001'' AND BO.KOPR = PR.KOPR ';
    set @query += 'left  join precios AS L   with (nolock) on L.KOPR=PR.KOPR ';
    set @query += 'left  join TABMR   AS MAR with (nolock) on MAR.KOMR=PR.MRPR ';
	--
	if ( @texto is null )	set @xorden = ' ORDER BY home.orden ';
	else					set @xorden = ' ORDER BY PR.NOKOPR ';
    --
    exec ksp_cambiatodo @texto, @salida = @descri OUTPUT ;
	--
    begin
		if ( @texto is null ) begin	
			--
			set @xnokopr = ' 1=1 ';
			set @query = concat( @query, ' WHERE ', @xnokopr, @stock, @soloconprecios, @xorden, @paginar ); 
			--
		end
		else begin
			--
			exec ksp_TipoGoogle 'PR.NOKOPR',	@descri, @salida = @xnokopr output;
			exec ksp_TipoGoogle 'PR.KOPR',		@descri, @salida = @xkopr output;
			exec ksp_TipoGoogle 'PR.NOKOPRAMP',	@descri, @salida = @xnokopramp output;
			set @query = concat( @query, ' WHERE ( ', @xnokopr,' or ',@xkopr,' or ', @xnokopramp,' ) ', @stock, @soloconprecios, @xorden, @paginar ); 
			--
		end;
		--
		-- print @query;
        EXECUTE sp_executesql @query
    end         
END;
go



 */


