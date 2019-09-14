import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  ngOnInit()
  {
    this.polygon = false;
    this.polyline = false;
    this.storage.get('lines').then((val) => 
    {
      let marcador : Marcador = JSON.parse(val);
      for (let i in marcador)
      {
        this.marcadores.push(marcador[i]);
        console.log(this.marcadores);
        if(parseInt(i)<=2)
        {
          this.paths.push(marcador[i]);
        }
        if(parseInt(i)==2)
        {
          this.latB = (marcador[2].lat);
          this.lngB = (marcador[2].lng);
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
  latC : number;
  lngC : number;
  latD : Number;
  lngD : number;
  polyline = false;

  constructor(private storage: Storage){  }

  agregarMarcador(evento){
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    //Almacenamiento en local storage
    this.storage.set('lines', JSON.stringify(this.marcadores) );
    console.log(this.marcadores.length);
    //Creación de la línea
     if(this.marcadores.length==1)
      {
        this.latA = parseFloat(evento.coords.lat);
        this.lngA = parseFloat(evento.coords.lng);
        console.log("Latitud: ",this.latA , " Longitud:",
        this.lngA);
      }
     if(this.marcadores.length==2)
     {
       this.latB = parseFloat(evento.coords.lat);
       this.lngB = parseFloat(evento.coords.lng);
       console.log("Latitud: ",this.latB , " Longitud:",this.lngB);
     }
     if(this.marcadores.length==3)
     {
       this.latC = parseFloat(evento.coords.lat);
       this.lngC = parseFloat(evento.coords.lng);
       console.log("Latitud: ",this.latC , " Longitud:",this.lngC);
     }
     if(this.marcadores.length==4)
     {
       this.latD = parseFloat(evento.coords.lat);
       this.lngD = parseFloat(evento.coords.lng);
       this.polyline = true;
       console.log("Latitud: ",this.latC , " Longitud:",this.lngD);
     }
  }
}