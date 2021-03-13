import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  lista = [];
  listaOrde = [];
  busquedaInput: string = '';
  tipoInput: string = '';
  condicion: boolean = false;
  showCard: boolean = true;
  showTarjeta:boolean=true;

  constructor(private http: HttpClient) { }

  cargarDatosSet() {
    let url = "https://api.pokemontcg.io/v2/sets";
    this.http.get(url).toPromise().then(data => {
      console.log(data['count']);
      if (data['count'] > 0) {
        console.log(data['data']);
        this.lista = data['data'];
        this.ordenar();
      }
      else {
        alert("no fue posible encontrar información solicitada");
      }
    }).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      alert("Servidor sin conexion");

    });
  }

compare(a, b) {
    let serieA = a.series;
    let serieB = b.series;
    if (serieA<serieB) {
      return -1;
    }
    if (serieA > serieB) {
      return 1;
    }
    
    return 0;
  }

  ordenar(){
    this.lista.sort(this.compare);
    this.listaOrdenar();
  } 

  listaOrdenar(){
    console.log(this.lista[0]);
    let a = this.lista[0].series;
    let b = [];
    for(let i=0; i<this.lista.length; i++){
      if(a==this.lista[i].series){
        b.push(this.lista[i]);
      }
      else{
        this.listaOrde.push(b);
        a = this.lista[i].series;
        b = [];
        b.push(this.lista[i]);
      }
    }
    console.log(this.listaOrde);
    this.showCard=true;
  }

  ngOnInit(): void {
    this.cargarDatosSet();
  }

  presionar(ele){
    console.log(ele.id);
    this.busquedaInput = '';
    this.tipoInput = '';
    this.busquedaInput = ele.id;
    this.tipoInput="set";
    this.condicion = true;
    this.showCard = true;
    this.showTarjeta=false;
  }

}
