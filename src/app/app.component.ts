import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemonAngular';
  busquedaInput: string = '';
  tipoInput: string = '';
  condicion: boolean = false;
  showCard: boolean = true;
  @ViewChild('buscarInput') inputName

  // con cada tecla apretada se activa esta funcion.
  buscar(letra) {
    console.log(letra.value);
    if(letra.value=="" || letra.value=='' ||letra.value==null){
      alert("No puedes dejar este campo en blanco");
    }
    else{
    this.busquedaInput = '';
    this.tipoInput = '';
    this.busquedaInput = letra.value;
    this.tipoInput="name";
    this.condicion = true;
    this.showCard = true;
    this.inputName.nativeElement.value = '';
    console.log(letra.value);
    }
  }

  constructor() { }

}

