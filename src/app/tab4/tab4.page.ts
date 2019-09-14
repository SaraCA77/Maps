import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
 ngOnInit()
  {
    this.polygon = false;
    this.polyline = false;
    this.storage.get('poligonos').then((val) => 
    {
      let marcador : Marcador = JSON.parse(val);
      for (let i in marcador)
      {
        this.marcadores.push(marcador[i]);
        console.log(this.marcadores);
        if(parseInt(i)==4)
        {
          this.polygon=true;
          this.latA = (marcador[i].lat);
          this.lngA = (marcador[i].lng);
        }
        if(parseInt(i)==5)
        {
          this.latB = (marcador[5].lat);
          this.lngB = (marcador[5].lng);
          this.polyline = true;
        }
      }        
    });
  }
  ingresarMarcador(lat, lng, title, description){
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

  marcadores : Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;
  paths: Array<any> = [];
  polygon = false;
  latA : number;
  latB : number;
  lngA : number;
  lngB : number;
  polyline = false;

  constructor(private storage: Storage){  }

  agregarMarcador(evento){
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    //Almacenamiento en local storage
    this.storage.set('poligonos', JSON.stringify(this.marcadores) );
    console.log(this.marcadores.length);
    //Creación del polígono
     if(this.marcadores.length>=6){
      this.paths=this.marcadores; 
      this.polygon=true;
    //Creación de la línea
    }
  }
}
