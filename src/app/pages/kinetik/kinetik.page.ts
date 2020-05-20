import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kinetik',
  templateUrl: './kinetik.page.html',
  styleUrls: ['./kinetik.page.scss'],
})
export class KinetikPage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true,
    loop: true,
  };
  imagenes = [ 'assets/images/g2s_001.jpg',
               'assets/images/g2s_002.jpg',
               'assets/images/g2s_003.jpg',
               'assets/images/g2s_004.jpg',
               'assets/images/g2s_005.jpg',
               'assets/images/g2s_006.jpg',
               'assets/images/g2s_007.jpg'
              ];

  constructor() { }

  ngOnInit() {
  }

}
